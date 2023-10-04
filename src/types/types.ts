export interface ElementsArgs {
    tag: string;
    classes?: string[] | (string | string[])[];
    textContent: string;
    callback?: (event?: Event | undefined) => void;
}
