//import styles from "../styles/Carousel-static.module.css"
import Image from "next/image";
import { useEffect, useRef } from "react";

const addClassToChild =
    (parent) =>
    (index) =>
    (...cls) =>
        parent.children[index].classList.add(...cls);

const removeClassFromChild =
    (parent) =>
    (index) =>
    (...cls) =>
        parent.children[index].classList.remove(...cls);

const removeClassFromAll =
    (parent) =>
    (...cls) =>
        Array.from(parent.children).forEach((child) =>
            child.classList.remove(...cls)
        );

const getClientX = (e) => {
    return e.type.startsWith("mouse")
        ? e.clientX
        : e.type.startsWith("touch")
        ? e.touches[0]?.clientX
        : 0;
};

const TABLET_WIDTH = "567px";
const MEDIUM_SCREEN_WIDTH = "756px";

/**
 *
 * @param {Number} currentItem
 * @param {Number} direction
 * @param {Number} nItems
 * @returns nextItem's index
 */
const getNextItem = (currentItem, direction, nItems) => {
    let nextItem;

    // change index number by one, either down or up, as we are moving among items
    nextItem = currentItem + direction;

    // if rightBtn was click => move right (slide left)
    if (direction === 1) {
        // when is the index beyond the far right of items array, set the first one as active
        if (nextItem > nItems - 1) {
            nextItem = 0;
        }
    } else {
        // when is the index beyond the far left of items array, set the last one as active
        if (nextItem < 0) {
            nextItem = nItems - 1;
        }
    }

    return nextItem;
};

const CarouselItem = ({ slideDuration, ...props }) => {
    let { player, image, alt, name } = props;
    let [fName, lName] = name.split(" ");
    let cardName = `${fName} '${player}' ${lName}`;

    return (
        <div className="item-wrapper">
            <div className="item-image-container">
                <Image
                    className="item-image"
                    src={image}
                    alt={alt}
                    layout={"fill"}
                    objectFit={"contain"}
                    draggable={false}
                />
            </div>
            <div className="item-desc-container">
                <h2 className="item-desc-text">{cardName}</h2>
            </div>
            <style jsx global>
                {`
                    .item-image {
                        clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
                        background: #1f1f1f;
                        object-fit: cover !important;
                        object-position: top;
                    }

                    @media screen and (min-width: ${TABLET_WIDTH}) {
                        .item-image {
                            clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
                            object-fit: contain !important;
                            object-position: center;
                        }
                    }

                    .item-wrapper.active.right
                        .item-image-container
                        .item-image,
                    .item-wrapper.next.right .item-image-container .item-image,
                    .item-wrapper.active.left .item-image-container .item-image,
                    .item-wrapper.next.left .item-image-container .item-image {
                        animation-duration: ${slideDuration}s;
                        animation-delay: 0s;
                        animation-direction: normal;
                        animation-fill-mode: forwards;
                        animation-timing-function: cubic-bezier(
                            1,
                            0.05,
                            0.5,
                            1
                        );
                        animation-iteration-count: 1;
                    }

                    .item-wrapper.active.right
                        .item-image-container
                        .item-image,
                    .item-wrapper.active.left
                        .item-image-container
                        .item-image {
                        animation-name: img-fade-out;
                    }

                    .item-wrapper.next.right .item-image-container .item-image,
                    .item-wrapper.next.left .item-image-container .item-image {
                        animation-name: img-fade-in;
                    }

                    @keyframes img-fade-out {
                        from {
                            opacity: 1;
                        }
                        to {
                            opacity: 0;
                        }
                    }

                    @keyframes img-fade-in {
                        from {
                            opacity: 0;
                            filter: blur(1rem);
                        }
                        to {
                            opacity: 1;
                            filter: blur(0);
                        }
                    }
                `}
            </style>
            <style jsx>
                {`
                    .item-wrapper {
                        display: none;
                        flex-direction: column;
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                    }

                    .item-wrapper.active {
                        display: flex;
                    }

                    .item-image-container {
                        position: relative;
                        width: 100%;
                        flex: 3;
                    }

                    .item-desc-container {
                        display: grid;
                        justify-items: center;
                        align-content: center;
                        flex: 0 1;
                        clip-path: polygon(0% 0%,60% 0%,90% 100%,15% 100%);
                        padding: 0rem 35% 0rem 10%;
                        background: deeppink;
                        will-change: transform, opacity;
                        transform: translate(0%, -50%);
                    }

                    @media screen and (min-width: ${TABLET_WIDTH}) {
                        .item-desc-container {
                            clip-path: polygon(0% 0%, 50% 0%, 75% 100%, 15% 100%);
                            padding: 1rem 45% 1rem 10%;
                    }
                    }

                    .item-desc-text {
                        text-align: center;
                    }

                    .item-wrapper.active.right,
                    .item-wrapper.next.right,
                    .item-wrapper.active.left,
                    .item-wrapper.next.left {
                        display: flex;
                        will-change: translate;
                        animation-duration: ${slideDuration}s;
                        animation-delay: 0s;
                        animation-direction: normal;
                        animation-fill-mode: forwards;
                        animation-timing-function: cubic-bezier(
                            1,
                            0.05,
                            0.5,
                            1
                        );
                        animation-iteration-count: 1;
                    }

                    .item-wrapper.active.right {
                        animation-name: slide-off-right;
                    }

                    .item-wrapper.next.right {
                        animation-name: slide-in-right;
                    }

                    .item-wrapper.active.left {
                        animation-name: slide-off-left;
                    }

                    .item-wrapper.next.left {
                        animation-name: slide-in-left;
                    }

                    .item-wrapper.next.right .item-desc-container,
                    .item-wrapper.next.left .item-desc-container,
                    .item-wrapper.active.right .item-desc-container,
                    .item-wrapper.active.left .item-desc-container {
                        animation-direction: normal;
                        animation-fill-mode: forwards;
                        animation-timing-function: cubic-bezier(
                            1,
                            0.05,
                            0.5,
                            1
                        );
                        animation-iteration-count: 1;
                    }

                    .item-wrapper.active.right .item-desc-container,
                    .item-wrapper.active.left .item-desc-container {
                        animation-duration: ${slideDuration / 2}s;
                        animation-delay: 0s;
                    }

                    .item-wrapper.active.right .item-desc-container {
                        animation-name: fade-out-right;
                    }

                    .item-wrapper.active.left .item-desc-container {
                        animation-name: fade-out-left;
                    }

                    .item-wrapper.next.right .item-desc-container,
                    .item-wrapper.next.left .item-desc-container {
                        animation-duration: ${slideDuration / 2}s;
                        animation-delay: ${slideDuration / 2}s;
                        opacity: 0;
                        animation-name: fade-in;
                    }

                    @keyframes fade-out-left {
                        from {
                            opacity: 1;
                            transform: translate(0%, -50%);
                        }
                        to {
                            opacity: 0;
                            transform: translate(-50%, -50%);
                        }
                    }

                    @keyframes fade-out-right {
                        from {
                            opacity: 1;
                            transform: translate(0%, -50%);
                        }
                        to {
                            opacity: 0;
                            transform: translate(50%, -50%);
                        }
                    }

                    @keyframes fade-in {
                        from {
                            opacity: 0;
                            transform: translate(25%, 0%);
                        }
                        to {
                            opacity: 1;
                            transform: translate(0%, -50%);
                        }
                    }

                    @keyframes slide-off-right {
                        from {
                            transform: translateX(0);
                        }
                        to {
                            transform: translateX(100%);
                        }
                    }

                    @keyframes slide-in-right {
                        from {
                            transform: translateX(-100%);
                        }
                        to {
                            transform: translateX(0);
                        }
                    }

                    @keyframes slide-off-left {
                        from {
                            transform: translateX(0);
                        }
                        to {
                            transform: translateX(-100%);
                        }
                    }

                    @keyframes slide-in-left {
                        from {
                            transform: translateX(100%);
                        }
                        to {
                            transform: translateX(0);
                        }
                    }
                `}
            </style>
        </div>
    );
};

const Carousel = ({ items }) => {
    const slideDuration = 0.8;
    let container = useRef(null),
        nItems = items?.length || 0,
        currentItem = 0,
        isSliding = false,
        isDragged = false,
        itemWidth = 0,
        xBase = 0,
        xDiff = 0;

    const slideItems = (curr, next, dir, duration = 0) => {
        let animationName, addClassCurrItem, addClassNextItem;
        animationName = dir === 1 ? "left" : "right";
        addClassCurrItem = addClassToChild(container)(curr);
        addClassNextItem = addClassToChild(container)(next);
        container.classList.add("sliding");

        // set items to motion
        addClassCurrItem(animationName);
        // and also mark next item with "next" className which makes it visible
        addClassNextItem(animationName, "next");

        // THIS is window when animations are running

        // update classes on animation end
        setTimeout(() => {
            removeClassFromChild(container)(curr)("active", animationName);
            removeClassFromChild(container)(next)("next", animationName);
            // finally add "active" classname to currently active item
            addClassNextItem("active");
            container.classList.remove("sliding");
            // set false so user can change items again
            isSliding = false;
        }, duration * 1000); // convert seconds into miliseconds
    };

    const onBtnClickHandler = (e) => {
        // cancel event if it's sliding at the moment
        if (isSliding) return;

        // init
        let direction, nextItem;

        // change state to sliding true
        isSliding = true;

        // get direction, left = -1, right = 1
        direction = Number(e.target.value);

        // calc next item
        nextItem = getNextItem(currentItem, direction, nItems);

        // set items in motion
        slideItems(currentItem, nextItem, direction, slideDuration);

        // update currentItem index
        currentItem = nextItem;
    };

    const deactivateSliding = (e) => {
        isDragged = false;
        xDiff = 0;
        container.classList.remove("pointer-down");
    };

    const activateSliding = (e) => {
        isDragged = true;
        xBase = getClientX(e);
        container.classList.add("pointer-down");
    };

    const onPointerDownHandler = (e) => {
        activateSliding(e);
    };

    const onPointerUpHandler = (e) => {
        deactivateSliding(e);
    };

    const onPointerMoveHandler = (e) => {
        if (!isDragged) return;

        let nextItem, direction, xCurrent;
        // get current pointer X coordinate
        xCurrent = getClientX(e);
        // difference between first touch point x coordinates and current coordinates
        xDiff = xBase - xCurrent;
        // if user slided 20% of item width, stop recording coordinates and slide in next item
        if (Math.abs(xDiff) >= itemWidth / 5) {
            // when user slides right => xDiff moves in positive values => slide in prev item
            // otherwise slide in next item
            direction = xDiff > 0 ? 1 : -1;
            nextItem = getNextItem(currentItem, direction, nItems);
            slideItems(currentItem, nextItem, direction, slideDuration);
            // update currentItem index
            currentItem = nextItem;
            deactivateSliding();
        }
    };

    useEffect(() => {
        if (items && nItems > 0) {
            removeClassFromAll(container)("active");
            addClassToChild(container)(currentItem)("active");
        }
    });

    useEffect(() => {
        itemWidth =
            (container && nItems > 0 &&
                container.children[0]?.getBoundingClientRect().width) ||
            0;
    });

    return (
        <div className="wrapper">
            {nItems > 0 ? (
                <div
                    ref={(el) => {
                        container = el;
                    }}
                    className="container"
                    onMouseDown={onPointerDownHandler}
                    onMouseUp={onPointerUpHandler}
                    onMouseMove={onPointerMoveHandler}
                    onTouchStart={onPointerDownHandler}
                    onTouchEnd={onPointerUpHandler}
                    onTouchMove={onPointerMoveHandler}
                >
                    {items &&
                        items.map((item) => {
                            return (
                                <CarouselItem
                                    key={item.player.slice(0, 10)}
                                    slideDuration={slideDuration}
                                    {...item}
                                />
                            );
                        })}
                    <div className="btn-wrapper left">
                        <button
                            value={-1}
                            name="btnLeft"
                            className="button"
                            onClick={onBtnClickHandler}
                        >
                            &lt;
                        </button>
                    </div>

                    <div className="btn-wrapper right">
                        <button
                            value={1}
                            name="btnRight"
                            className="button"
                            onClick={onBtnClickHandler}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            ) : (
                <div className="container-bone">Loading...</div>
            )}

            <style jsx>{`
                .wrapper {
                    position: relative;
                    height: 40rem;
                    overflow: hidden;
                    width: 100%;
                }

                @media screen and (min-width: ${TABLET_WIDTH}) {
                    .wrapper {
                        padding: 0 2rem;
                    }
                }

                @media screen and (min-width: ${MEDIUM_SCREEN_WIDTH}) {
                    .wrapper {
                        padding: 0 5rem;
                    }
                }

                @media screen and (min-width: 1024px) {
                    .wrapper {
                        padding: 0 10rem;
                    }
                }

                .container,
                .container-bone {
                    position: relative;
                    height: 100%;
                    margin: 0 auto;
                    max-width: 768px;
                    cursor: grab;
                }

                .container-bone {
                    background-color: #1f1f1f;
                }

                .container.pointer-down {
                    cursor: grabbing;
                }

                .btn-wrapper {
                    position: absolute;
                    top: 0;
                    height: 75%;
                    width: 25%;
                }

                .btn-wrapper.left {
                    left: 0;
                    clip-path: polygon(0 0, 0% 100%, 100% 0%);
                }

                .btn-wrapper.right {
                    right: 0;
                    clip-path: polygon(0 100%, 100% 100%, 100% 0);
                }

                .button {
                    display: none;
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background: #1f1f1f;
                    border: none;
                    cursor: pointer;
                    color: #fff;
                    transition: opacity 0.2s ease, scale 0.2s ease;
                    will-change: opacity, scale;
                    opacity: 0.5;
                    scale: 0.5;
                }

                @media screen and (min-width: ${TABLET_WIDTH}) {
                    .button {
                        display: block;
                    }
                }

                .container.sliding .button,
                .container.sliding .button:hover {
                    opacity: 0;
                }

                .btn-wrapper:hover .button {
                    opacity: 1;
                    scale: 0.75;
                }

                .btn-wrapper.left .button {
                    left: 0;
                    clip-path: polygon(65% 25%, 25% 65%, 0% 45%);
                }

                .btn-wrapper.right .button {
                    right: 0;
                    clip-path: polygon(100% 65%, 40% 80%, 80% 40%);
                }
            `}</style>
        </div>
    );
};

export default Carousel;
