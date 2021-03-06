/// <reference types="react" />
import { GenerateConfig } from '../generate';
import { CustomFormat, PanelMode, PickerMode } from '../interface';
export declare function scrollTo(element: HTMLElement, to: number, duration: number): void;
export interface KeyboardConfig {
    onLeftRight?: ((diff: number) => void) | null;
    onCtrlLeftRight?: ((diff: number) => void) | null;
    onUpDown?: ((diff: number) => void) | null;
    onPageUpDown?: ((diff: number) => void) | null;
    onEnter?: (() => void) | null;
}
export declare function createKeyDownHandler(event: React.KeyboardEvent<HTMLElement>, { onLeftRight, onCtrlLeftRight, onUpDown, onPageUpDown, onEnter }: KeyboardConfig): boolean;
export declare function getDefaultFormat<DateType>(format: string | CustomFormat<DateType> | Array<string | CustomFormat<DateType>> | undefined, picker: PickerMode | undefined, showTime: boolean | object | undefined, use12Hours: boolean | undefined): string | CustomFormat<DateType> | (string | CustomFormat<DateType>)[];
export declare function getInputSize<DateType>(picker: PickerMode | undefined, format: string | CustomFormat<DateType>, generateConfig: GenerateConfig<DateType>): number;
declare type ClickEventHandler = (event: MouseEvent) => void;
export declare function addGlobalMouseDownEvent(callback: ClickEventHandler): () => void;
export declare const PickerModeMap: Record<PickerMode, ((next: PanelMode) => PanelMode) | null>;
export declare function elementsContains(elements: (HTMLElement | undefined | null)[], target: HTMLElement): boolean;
export {};
