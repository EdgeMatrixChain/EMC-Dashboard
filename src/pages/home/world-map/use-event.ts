import * as echarts from 'echarts';
import { useIsMobile } from '@/composables/use-screen';

export function useEvent() {
  const LONG_PRESS_TIME = 500;
  const isMobile = useIsMobile();
  /**
   * @param p1 [x,y]
   * @param p2 [x,y]
   */
  const isTap = (p1: [number, number], p2: [number, number]) => {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    return Math.abs(x2 - x1) < 5 && Math.abs(y2 - y1) < 5;
  };

  return {
    initZRenderEvent(zrender: echarts.zrender.ZRenderType, callbacks: any) {
      let eventName = 'tap';
      let sx = 0;
      let sy = 0;
      let st = 0;
      let timer: any = null;
      zrender.on('mousedown', function (event: echarts.ElementEvent) {
        const { offsetX, offsetY } = event;
        const { timeStamp } = event.event;
        sx = offsetX;
        sy = offsetY;
        eventName = 'tap';
        st = timeStamp;
        const touchesLength = (event.event as any).touches?.length;
        if (typeof touchesLength === 'undefined' || touchesLength === 1) {
          timer = setTimeout(() => {
            if (typeof callbacks.onLongPress === 'function') callbacks.onLongPress(event);
          }, LONG_PRESS_TIME);
        } else {
          if (timer) {
            clearTimeout(timer);
          }
        }

        typeof callbacks.onMouseDown === 'function' && callbacks.onMouseDown(event);
      });

      zrender.on('mouseup', function (event: echarts.ElementEvent) {
        const { timeStamp } = event.event;
        if (eventName === 'tap' && timeStamp - st < LONG_PRESS_TIME) {
          typeof callbacks.onTap === 'function' && callbacks.onTap(event);
          if (timer) clearTimeout(timer);
        }
        typeof callbacks.onMouseUp === 'function' && callbacks.onMouseUp(event);
        sx = 0;
        sy = 0;
        st = 0;
        timer = null;
        eventName = 'tap';
      });

      zrender.on('mousemove', function (event: echarts.ElementEvent) {
        const { offsetX, offsetY } = event;
        if (!st && isMobile.value) return;
        if (isTap([sx, sy], [offsetX, offsetY])) return;
        if (timer) clearTimeout(timer);

        const deltaX = offsetX - sx;
        const deltaY = offsetY - sy;

        if (eventName === 'moveY') {
          if (typeof callbacks.onMoveY === 'function') callbacks.onMoveY(event, [deltaX, deltaY]);
        } else if (eventName === 'moveX') {
          if (typeof callbacks.onMoveX === 'function') callbacks.onMoveX(event, [deltaX, deltaY]);
        } else {
          const angle = Math.atan2(deltaY, deltaX);
          const angleDegrees = angle * (180 / Math.PI);
          if ((angleDegrees < -45 && angleDegrees > -135) || (angleDegrees >= 45 && angleDegrees <= 135)) {
            eventName = 'moveY';
            if (typeof callbacks.onMoveY === 'function') callbacks.onMoveY(event, [deltaX, deltaY]);
          } else {
            eventName = 'moveX';
            if (typeof callbacks.onMoveX === 'function') callbacks.onMoveX(event, [deltaX, deltaY]);
          }
        }
      });

      zrender.on('globalout', function (event: echarts.ElementEvent) {
        if (!st) return;
        typeof callbacks.onOut === 'function' && callbacks.onOut(event);
      });

      zrender.on('contextmenu', function (event: echarts.ElementEvent) {
        event.event.preventDefault();
      });
    },
  };
}
