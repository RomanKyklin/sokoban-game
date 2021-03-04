export class GameRenderer {
    constructor(rootElementSelector) {
        this.rootElementSelector = rootElementSelector;
    }

    getHtml() {
        return `<div class="main">
                    <header class="header">
                        <nav class="header__nav">
                            <ul class="header__ul">
                                <li class="header__li start-new-game">Начать заново</li>
                            </ul>
                        </nav>
                    </header>
        
                <section class="game">
                    <table class="game__table">
                        <tr class="game__table__tr">
                            <td class="game__table__td game__table__td--box"></td>
                            <td class="game__table__td game__table__td--box"></td>
                            <td class="game__table__td game__table__td--box"></td>
                            <td class="game__table__td game__table__td--box"></td>
                            <td class="game__table__td game__table__td--box"></td>
                            <td class="game__table__td game__table__td--box"></td>
                        </tr>
                        <tr class="game__table__tr">
                            <td class="game__table__td game__table__td--box"></td>
                            <td class="game__table__td game__table__td--ground"></td>
                            <td class="game__table__td game__table__td--ground"></td>
                            <td id="default-player-place"
                                class="game__table__td game__table__td--ground game__table__td--player game__table__td--player-default">
                            </td>
                            <td class="game__table__td game__table__td--ground"></td>
                            <td class="game__table__td game__table__td--box"></td>
                        </tr>
                        <tr class="game__table__tr">
                            <td class="game__table__td game__table__td--box"></td>
                            <td id="default-brown-box-place" class="game__table__td game__table__td--brown-box"></td>
                            <td class="game__table__td game__table__td--box"></td>
                            <td class="game__table__td game__table__td--box"></td>
                            <td class="game__table__td game__table__td--box"></td>
                            <td class="game__table__td game__table__td--box"></td>
                        </tr>
                        <tr class="game__table__tr">
                            <td class="game__table__td game__table__td--box"></td>
                            <td class="game__table__td game__table__td--ground"></td>
                            <td class="game__table__td game__table__td--box"></td>
                            <td class="game__table__td"></td>
                            <td class="game__table__td"></td>
                            <td class="game__table__td"></td>
                        </tr>
                        <tr class="game__table__tr">
                            <td class="game__table__td game__table__td--box"></td>
                            <td id="default-environment-place" class="game__table__td game__table__td--environment"></td>
                            <td class="game__table__td game__table__td--box"></td>
                            <td class="game__table__td"></td>
                            <td class="game__table__td"></td>
                            <td class="game__table__td"></td>
                        </tr>
                        <tr class="game__table__tr">
                            <td class="game__table__td game__table__td--box"></td>
                            <td class="game__table__td game__table__td--box"></td>
                            <td class="game__table__td game__table__td--box"></td>
                            <td class="game__table__td"></td>
                            <td class="game__table__td"></td>
                            <td class="game__table__td"></td>
                        </tr>
                    </table>
                </section>
        </div>`
    }

    render() {
        const rootElement = document.querySelector(`${this.rootElementSelector}`);

        if (rootElement) {
            rootElement.innerHTML = this.getHtml();
            return;
        }

        throw new Error('root element was not found!');
    }
}
