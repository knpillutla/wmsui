
export interface FieldList {
    fieldName: string;
    fieldDisplayName: string;
    disableField: string;
    hideField: string;
    fieldType: string;
    fieldDataType: string;
    fieldLength: string;
    allowedValues: string;
    displayOptions: string;
    initializeValue?: string;
    defaultValue: string;
}

export interface RequestFieldList {
    fieldName: string;
    fieldType: string;
    promptForInput: string;
}

export interface ActionResourceList {
    actionName: string;
    actionDisplayName: string;
    actionUrl: string;
    requestFieldList: RequestFieldList[];
}

export interface HdrResource {
    recordName: string;
    recordDisplayName: string;
    searchUrl: string;
    listUrl: string;
    getRecordUrl: string;
    addRecordUrl: string;
    updateRecordUrl: string;
    deleteRecordUrl: string;
    fieldList: FieldList[];
    searchFieldList: string[];
    actionResourceList: ActionResourceList[];
}

export interface DtlResource {
    recordName: string;
    recordDisplayName: string;
    searchUrl: string;
    listUrl: string;
    getRecordUrl: string;
    addRecordUrl: string;
    updateRecordUrl: string;
    deleteRecordUrl: string;
    fieldList: FieldList[];
    searchFieldList: any[];
}

export interface ScreenResourceList {
    screenName: string;
    screenDisplayName: string;
    screenTitle: string;
    screenAccess: string;
    screenType: string;
    hdrResource: HdrResource;
    dtlResources: DtlResource[];
}

export interface MenuResourceList {
    menuName: string;
    screenResourceList: ScreenResourceList[];
}

export interface UserDetailsModel {
    id: number;
    busName: string;
    defLocnNbr: number;
    userName: string;
    authType: string;
    firstName: string;
    lastName: string;
    middleName: string;
    addr1: string;
    addr2: string;
    addr3: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    locale: string;
    userId: string;
    menuResourceList: MenuResourceList[];
}
