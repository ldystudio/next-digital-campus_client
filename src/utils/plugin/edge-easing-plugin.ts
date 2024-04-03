import type { Data2d } from "smooth-scrollbar/interfaces"
import { ScrollbarPlugin } from "smooth-scrollbar"

export default class EdgeEasingPlugin extends ScrollbarPlugin {
    static override pluginName = "edgeEasing"
    private _remainMomentum = { x: 0, y: 0 }

    override transformDelta(delta: Data2d) {
        const { limit, offset } = this.scrollbar
        const x = this._remainMomentum.x + delta.x
        const y = this._remainMomentum.y + delta.y

        // clamps momentum within [-offset, limit - offset]
        this.scrollbar.setMomentum(
            Math.max(-offset.x, Math.min(x, limit.x - offset.x)),
            Math.max(-offset.y, Math.min(y, limit.y - offset.y))
        )

        return { x: 0, y: 0 }
    }

    override onRender(remainMomentum: Data2d) {
        Object.assign(this._remainMomentum, remainMomentum)
    }
}
