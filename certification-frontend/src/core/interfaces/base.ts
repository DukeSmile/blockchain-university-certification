export interface RouteItemProp {
    url: string;
    owner: number;
    element: JSX.Element;
};

export interface processSubjectProp {
    [key:string] : string // title of subjects
}

export interface subjectProp {
    title: string;
    mark: number;
    unit: number;
}
export interface processProp {
    name: string;
    subjects: subjectProp[];
    detail?: string;
}

export interface studentInfoProp {
    [key:string]: string;
}