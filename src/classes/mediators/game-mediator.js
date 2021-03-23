export const GAME_ENGINE_ACTIONS = {
    on_left: 'on_left',
    on_right: 'on_right',
    on_top: 'on_top',
    on_bottom: 'on_bottom',
    start_new_game: 'start_new_game',
    to_the_next_level: 'to_the_next_level',
    rerender_game: 'rerender_game',
    rerender_builder: 'rerender_builder'
}

export class GameMediator {
    constructor() {
        this.channels = {};
    }

    subscribe(channel, fn) {
        if (!this.channels[channel]) {
            this.channels[channel] = []
        }
        this.channels[channel].push({
            context: this,
            callback: fn
        });
        return this;
    }

    publish(channel) {
        if (!this.channels[channel]) {
            return false
        }

        let args = Array.prototype.slice.call(arguments, 1);

        for (let i = 0, l = this.channels[channel].length; i < l; i++) {
            let subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    }
}
