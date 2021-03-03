(function game(document) {
    const playerDefaultCssClass = ['game__table__td--player', 'game__table__td--player-default'];
    const groundCssClass = 'game__table__td--ground';
    const brownBoxCssClass = 'game__table__td--brown-box';
    const environmentCssClass = 'game__table__td--environment';

    document.querySelector('.start-new-game').addEventListener('click', () => {
        document.querySelectorAll('.game__table__td--ground').forEach(node => {
            node.classList.remove(...playerDefaultCssClass);
        })
        document.querySelector('#start-game-block').classList.add(...playerDefaultCssClass);
    })

    document.addEventListener('keydown', $e => {
        const {key} = $e;
        let playerElement = document.querySelector('.game__table__td--player');
        let leftSibling;
        let rightSibling;
        let topElement;
        let bottomElement;
        let parentElement;
        let topParentSibling;
        let bottomParentSibling;
        let elementKey;

        switch (key) {
            case 'ArrowLeft':
                leftSibling = playerElement.previousElementSibling;
                if (leftSibling && leftSibling.classList.contains(groundCssClass)) {
                    playerElement.classList.remove(...playerDefaultCssClass);
                    leftSibling.classList.add(...playerDefaultCssClass);
                }
                return;
            case 'ArrowRight':
                rightSibling = playerElement.nextElementSibling;
                if (rightSibling && rightSibling.classList.contains(groundCssClass)) {
                    playerElement.classList.remove(...playerDefaultCssClass);
                    rightSibling.classList.add(...playerDefaultCssClass);
                }
                return;
            case 'ArrowUp':
                parentElement = playerElement.parentElement;
                topParentSibling = parentElement ? parentElement.previousElementSibling : null;
                elementKey;
                parentElement.childNodes.forEach((node, key) => {
                    if (node === playerElement) elementKey = key;
                })

                if (topParentSibling && topParentSibling.childNodes.length > 0) {
                    topParentSibling.childNodes.forEach((val, key) => {
                        if (key === elementKey) {
                            topElement = val;
                        }
                    });

                    if (topElement && topElement.classList.contains(groundCssClass)) {
                        playerElement.classList.remove(...playerDefaultCssClass);
                        topElement.classList.add(...playerDefaultCssClass);
                    }
                }

                return;
            case 'ArrowDown':
                parentElement = playerElement.parentElement;
                bottomParentSibling = parentElement ? parentElement.nextElementSibling : null;
                elementKey;
                parentElement.childNodes.forEach((node, key) => {
                    if (node === playerElement) elementKey = key;
                })

                if (bottomParentSibling && bottomParentSibling.childNodes.length > 0) {
                    bottomParentSibling.childNodes.forEach((val, key) => {
                        if (key === elementKey) {
                            bottomElement = val;
                        }
                    });

                    if (bottomElement && (bottomElement.classList.contains(groundCssClass)
                        || bottomElement.classList.contains(brownBoxCssClass)
                        || bottomElement.classList.contains(environmentCssClass))) {
                        playerElement.classList.remove(...playerDefaultCssClass);
                        bottomElement.classList.add(...playerDefaultCssClass);
                    }
                }
                return;
            default:
                return;
        }
    })

})(document)
