import { useCallback, useEffect, useState } from "react";
import styles from "@/app/page.module.css";

export function usePrevNextButtons(emblaApi) {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  });

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    onPrevButtonClick,
    onNextButtonClick,
    prevBtnDisabled,
    nextBtnDisabled,
  };
}

export function PrevButton(props) {
  const { children, ...restProps } = props;

  return (
    <button className={`${styles.embla__button} left-0`} type="button" {...restProps}>
      <svg className="embla__button__svg" viewBox="0 0 532 532">
        <path fill="currentColor" d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z" />
      </svg>
      {children}
    </button>
  );
}

export function NextButton(props) {
  const { children, ...restProps } = props;

  return (
    <button className={`${styles.embla__button} right-0`} type="button" {...restProps}>
      <svg className="embla__button__svg" viewBox="0 0 532 532">
        <path fill="currentColor" d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.338 61.39c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0a5994246.277 5994246.277 0 0 0 229.332 229.454 35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2C359.808 337.027 199.269 497.69 176.34 520.646Z" />
      </svg>
      {children}
    </button>
  );
}
