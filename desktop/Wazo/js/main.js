/**
 * An object that represents a selected concept with its index on the list
 * @typedef {Object} ConceptReference
 * @property {Concept} concept
 * @property {number} index
 */

/**
 * An object that represents a selected view in a concept with its index on the list
 * @typedef {Object} ViewReference
 * @property {HTMLElement} current.view
 * @property {number} current.index
 */

/** The main class.
 * This wlass will be bind to the "#wazo" element and all the presentations will be managed by here
 */
class Wazo {
    constructor() {
        //_root setup
        let root = document.getElementById("wazo");
        let errorMessage =
            "Missing #Wazo element.\nPlease add the 'wazo' id to the root element of your choice";
        if (root != null)
            /**
             * Represent the "#wazo" element that will be the root.
             * @private
             */
            this._root = root;
        else throw new Error(errorMessage);
        this._root.setAttribute("tabindex", "0");
        //Container setup
        let container = this._root.querySelector(".container");
        errorMessage = "Missing .container element inside roor";
        if (container != null)
            /**
             * Represents the element that will contain all the presentations
             * @private
             */
            this._container = new Container(container);
        else throw new Error(errorMessage);
    }

    /**
     * Initialize all the parameters like sizing.
     * @public
     */
    initialize() {
        this._container.initialize();
        this._root.addEventListener("keydown", this.keyListener);
    }

    /**@private */
    keyListener = (e) => {
        if (e.key === "ArrowUp" || e.key === "Up") this._container.up();
        else if (e.key === "ArrowDown" || e.key === "Down")
            this._container.down();
        else if (e.key === "ArrowLeft" || e.key === "Left")
            this._container.left();
        else if (e.key === "ArrowRight" || e.key === "Right")
            this._container.right();
        else if (e.key === "PageUp") this._container.prev();
        else if (e.key === "PageDown") this._container.next();
    };
}

/**
 * Represents the container of all the presentation.
 * Will contain each pages (named "concept") and all the views.
 */
class Container {
    /**
     * @public
     * @param {ConceptReference} current
     */
    set Current(current) {
        this._current = current;
    }
    /**
     * @public
     * @returns {ConceptReference}
     */
    get Current() {
        return this._current;
    }

    /**@returns {boolean} */
    get atFirst() {
        return this.Current.index == 0;
    }
    /**@returns {boolean} */
    get atLast() {
        return this.Current.index == this._conceptList.Length - 1;
    }

    /** @param {HTMLElement} element */
    constructor(element) {
        /** @private */
        this._element = element;
        /** @private */
        this._conceptList = new ConceptList(
            this._element.getElementsByClassName("concept")
        );
        /**
         * @private
         * @type {ConceptReference}
         */
        this._current = { concept: this._conceptList.FirstElement, index: 0 };
    }

    /**
     * Initialize all the parameters like sizing.
     * @public
     */
    initialize() {
        this._element.style.gridTemplateColumns = `repeat(${this._conceptList.Length},100%)`;
        this._conceptList.initialize();
    }

    /**
     * Make the move on the screen by translating the container.
     * @private
     * @param {ConceptReference} target The targeted concept.
     */
    _move(target) {
        if (target.index != this.Current.index) {
            let decallage = (this.Current.index - target.index) * 100;
            let currentDecallage = this.Current.index * -100;
            this._element.style.transform = `translateX(${
                currentDecallage + decallage
            }%)`;
            this.Current = Object.assign({}, target);
        }
    }

    up = () => this.Current.concept.prev();

    down = () => this.Current.concept.next();

    left = () => {
        let target = this._conceptList.prev(this.Current.index);
        this._move(target);
    };

    right = () => {
        let target = this._conceptList.next(this.Current.index);
        this._move(target);
    };

    prev = () => {
        if (this.Current.concept.atFirst) {
            if (!this.atFirst) {
                this.left();
                this.Current.concept.toLast();
            }
        } else this.up();
    };

    next = () => {
        if (this.Current.concept.atLast) {
            if (!this.atLast) {
                this.right();
                this.Current.concept.toFirst();
            }
        } else this.down();
    };
}

/**
 * A class that represents the list of all concpets(pages)
 */
class ConceptList {
    /**
     * @returns {Concept}
     */
    get FirstElement() {
        return this.getElement(0);
    }
    /**
     * @returns {Concept}
     */
    get LastElement() {
        return this.getElement(this.Length - 1);
    }
    /**
     * @returns {number}
     */
    get Length() {
        return this._collection.length;
    }

    /**
     *
     * @param {HTMLCollectionOf<Element>} conceptList
     */
    constructor(conceptList) {
        /**
         * @private
         * @type {Array<Concept>}
         */
        this._collection = [];
        for (let i = 0; i < conceptList.length; i++) {
            this._collection.push(new Concept(conceptList[i]));
        }
    }

    /**
     * Initialize each concept.
     */
    initialize() {
        this._collection.forEach((concept) => concept.initialize());
    }

    /**
     * @returns {ConceptReference}
     */
    toFirst = () => {
        return { concept: this.FirstElement, index: 0 };
    };
    /**
     * @returns {ConceptReference}
     */
    toLast = () => {
        return { concept: this.LastElement, index: this.Length - 1 };
    };

    /**
     *
     * @param {number} index
     * @returns {ConceptReference}
     */
    prev = (index) => {
        if (index <= 0) return this.toFirst();
        else return { concept: this.getElement(index - 1), index: index - 1 };
    };
    /**
     *
     * @param {number} index
     * @returns {ConceptReference}
     */
    next = (index /*: number*/) /*: { concept: Concept; index: number }*/ => {
        if (index >= this.Length - 1) return this.toLast();
        else return { concept: this.getElement(index + 1), index: index + 1 };
    };

    /**
     *
     * @param {number} index
     * @returns {Concept}
     */
    getElement(index) /*: Concept */ {
        return this._collection[index];
    }

    /**
     * Get the Maximum size of all the concepts.
     * @returns {number}
     */
    getMaxSize() {
        let max = 0;
        this._collection.forEach(
            (concept) => (max = max < concept.Size ? concept.Size : max)
        );
        return max;
    }
}

/**
 * Represents a page of the presentation (concept) with its all view.
 */
class Concept {
    /**
     * @public
     * @param {ViewReference} current
     */
    set Current(current) {
        this._current = current;
    }
    /**
     * @public
     * @returns {ViewReference}
     */
    get Current() {
        return this._current;
    }

    /**
     * The size of the current concept (count of its view)
     * @returns {number}
     */
    get Size() {
        return this._viewList.Length;
    }
    /**
     * Check if the current view if the first view of the concept
     * @returns {boolean}
     */
    get atFirst() {
        return this.Current.index == 0;
    }
    /**
     * Check if the current view is the last of the concept
     * @returns {boolean}
     */
    get atLast() {
        return this.Current.index == this._viewList.Length - 1;
    }

    /**
     *
     * @param {Element} element
     */
    constructor(element) {
        /**
         * @private
         * @type {Element}
         */
        this._element = element;
        /**
         * @private
         * @type {ViewList}
         */
        this._viewList = new ViewList(
            this._element.getElementsByClassName("concept__view")
        );
        /**
         * @private
         * @type {ViewReference}
         */
        this._current = { view: this._viewList.FirstElement, index: 0 };
    }

    /**
     * Initialize all the views in the view list.
     */
    initialize() {
        this._viewList.initialize();
    }

    /**
     *
     * @param {ViewReference} target
     * @param {boolean} animated
     */
    _move(target, animated) {
        if (target.index != this.Current.index) {
            target.view.style.transition = animated ? "opacity 1s" : "";
            this.Current.view.style.transition = animated ? "opacity 0.5s" : "";
            target.view.style.opacity = "1";
            this.Current.view.style.opacity = "0";

            this.Current = Object.assign({}, target);
        }
    }

    prev = () => {
        let target = this._viewList.prev(this.Current.index);
        this._move(target, true);
    };

    next = () => {
        let target = this._viewList.next(this.Current.index);
        this._move(target, true);
    };

    toLast = () => {
        let target = this._viewList.toLast();
        this._move(target, false);
    };

    toFirst = () => {
        let target = this._viewList.toFirst();
        this._move(target, false);
    };
}

/**
 * Represents the list of all views inside a concept
 */
class ViewList {
    /**
     * @returns {HTMLElement}
     */
    get FirstElement() {
        return this.getElement(0);
    }
    /**
     * @returns {HTMLElement}
     */
    get LastElement() {
        return this.getElement(this.Length - 1);
    }
    /**
     * @returns {number}
     */
    get Length() {
        return this._collection.length;
    }

    /**
     *
     * @param {HTMLCollectionOf<Element>} viewList
     */
    constructor(viewList) {
        /**
         * @type {HTMLCollectionOf<HTMLElement>}
         * @private
         */
        this._collection = viewList;
    }

    /**
     * Initialize the opacity off all view to let only the top(first) view to be visible
     */
    initialize() {
        for (let i = 1; i < this._collection.length; i++) {
            let view = this._collection[i];
            view.style.opacity = "0";
        }
    }

    toFirst = () => {
        return { view: this.FirstElement, index: 0 };
    };

    toLast = () => {
        return { view: this.LastElement, index: this.Length - 1 };
    };

    prev = (index) => {
        if (index <= 0) return this.toFirst();
        else return { view: this.getElement(index - 1), index: index - 1 };
    };

    next = (index) => {
        if (index >= this.Length - 1) return this.toLast();
        else return { view: this.getElement(index + 1), index: index + 1 };
    };

    /**
     * Get a specific element by its index
     * @param {number} index
     * @returns {HTMLElement}
     */
    getElement(index) {
        return this._collection[index];
    }
}

class View extends Element {
    constructor() {
        super();
    }
}
