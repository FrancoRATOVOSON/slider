/*function wazoStart() {
    document.addEventListener("DOMContentLoaded", function () {
        let wazo = new Wazo();
        wazo.initialize();
    });
}*/

class Wazo {
    /**
     *
     * @param {boolean} [fullscreen=true] If true, the presentation will be set full screen
     */
    constructor() {
        this.root = document.getElementsByClassName("wazo")[0];

        this.container = document.getElementsByClassName("container")[0];
        this.conceptList = document.getElementsByClassName("concept");
        this.currentItem = { concept: 0, view: 0 };
        this.currentSizing = { height: 0, width: 0 };

        //Make the element focusable so it can listen to keyboard events
        this.root.setAttribute("tabindex", "0");
    }

    setSizing() {
        let contents = document.getElementsByClassName("concept__view");
        let conceptWidth = 100 / this.currentSizing.width;
        for (let i = 0; i < contents.length; i++)
            contents[i].style.height = `${100 / this.currentSizing.height}%`;
        for (let i = 0; i < this.conceptList.length; i++)
            this.conceptList[i].style.width = `${conceptWidth}%`;
        this.container.style.width = `${this.currentSizing.width * 100}%`;
        this.container.style.height = `${this.currentSizing.height * 100}%`;
    }

    initialize() {
        //Setting up the width of the container
        this.currentSizing.width = this.conceptList.length;
        //Setting up the height of the container
        for (let i = 0; i < this.currentSizing.width; i++) {
            let conceptSize = selectAllConceptView(this.conceptList[i]).length;
            if (this.currentSizing.height < conceptSize)
                this.currentSizing.height = conceptSize;
        }

        this.root.addEventListener("keyup", this.keyListener);
        this.setSizing();
    }

    keyListener = (e) => {
        if (e.key === "ArrowUp" || e.key === "Up") this.up();
        else if (e.key === "ArrowDown" || e.key === "Down") this.down();
        else if (e.key === "ArrowLeft" || e.key === "Left") this.left();
        else if (e.key === "ArrowRight" || e.key === "Right") this.right();
        else if (e.key === "PageUp") this.prev();
        else if (e.key === "PageDown") this.next();
    };

    up = () => {
        if (this.currentItem.view > 0)
            this.gotoView({
                concept: this.currentItem.concept,
                view: this.currentItem.view - 1,
            });
    };

    down = () => {
        if (!this.isLastView())
            this.gotoView({
                concept: this.currentItem.concept,
                view: this.currentItem.view + 1,
            });
    };

    left = () => {
        if (this.currentItem.concept > 0)
            this.gotoView({ concept: this.currentItem.concept - 1, view: 0 });
    };

    right = () => {
        if (!this.isLastConcept())
            this.gotoView({ concept: this.currentItem.concept + 1, view: 0 });
    };

    prev = () => {
        if (this.currentItem.view === 0 && this.currentItem.concept > 0) {
            let conceptGoal = this.currentItem.concept - 1;
            this.gotoView({
                concept: conceptGoal,
                view: this.getConceptLength(conceptGoal) - 1,
            });
        } else this.up();
    };

    next = () => {
        if (this.isLastView() && !this.isLastConcept()) this.right();
        else this.down();
    };

    /**
     *  Go to specific index
     * @param {Object} index Index of the target
     * @param {Object} index.concept index of the target concept (x)
     * @param {Object} index.view index of the target view on the target concept (y)
     */
    gotoView = (index) => {
        let translateX = (-100 * index.concept) / this.currentSizing.width;
        let translateY = (-100 * index.view) / this.currentSizing.height;

        this.container.style.transform = `translateX(${translateX}%)`;

        if (this.didVerticalyMoved(index)) {
            if (
                selectAllConceptView(this.conceptList[index.concept]).length > 1
            )
                selectAllConceptView(this.conceptList[index.concept])[
                    this.currentItem.view
                ].style.animation = "";
            if (this.didHorizontalyMoved(index))
                selectAllConceptView(
                    this.conceptList[this.currentItem.concept]
                )[this.currentItem.view].style.animation = "";
        }

        this.conceptList[
            index.concept
        ].style.transform = `translateY(${translateY}%)`;

        if (this.didVerticalyMoved(index) && !this.didHorizontalyMoved(index)) {
            selectAllConceptView(this.conceptList[index.concept])[
                index.view
            ].style.animation = "fadein 1.5s";
        }

        this.currentItem = Object.assign({}, index);
    };

    /**
     * Return the state on the current concept.
     * @returns {boolean}
     */
    isLastView = () => {
        let conceptViewList = selectAllConceptView(
            this.conceptList[this.currentItem.concept]
        );
        return this.currentItem.view === conceptViewList.length - 1;
    };

    /**
     * Return the state on all concept.
     * @returns {boolean}
     */
    isLastConcept = () => {
        return this.currentItem.concept === this.conceptList.length - 1;
    };
    /**
     * Return the length of the current concept.
     * @returns {number}
     */
    getCurrentConceptLength = () => {
        return this.getConceptLength(this.currentItem.concept);
    };
    /**
     * Return the length of the concept send to the "conceptIndex" param
     * @param {number} conceptIndex
     * @returns {number}
     */
    getConceptLength = (conceptIndex) => {
        return conceptIndex >= 0 && conceptIndex < this.conceptList.length
            ? selectAllConceptView(this.conceptList[conceptIndex]).length
            : 0;
    };

    /**
     *
     * @param {object} index
     * @param {object} index.concept
     * @param {object} index.view
     * @returns {boolean}
     */
    didHorizontalyMoved(index) {
        return index.concept !== this.currentItem.concept;
    }

    /**
     *
     * @param {object} index
     * @param {object} index.concept
     * @param {object} index.view
     * @returns {boolean}
     */
    didVerticalyMoved(index) {
        return index.view !== this.currentItem.view;
    }

    /**
     *
     * @param {object} index
     * @param {object} index.concept
     * @param {object} index.view
     * @returns {boolean}
     */
    didMoved(index) {
        return this.didHorizontalyMoved(index) || this.didVerticalyMoved(index);
    }
}

//******/
/*UTILS*/
//******/

/**
 *  Get all ".concept__view" in the concept send to "element"
 * @param {HTMLElement|Document} element
 * @returns {NodeListOf<Element>}
 */
function selectAllConceptView(element) {
    return element.querySelectorAll(".concept__view");
}
