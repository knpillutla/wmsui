export interface FieldList {
    fieldName: string;
    fieldDisplayName: string;
    hiddenField: string;
    isPrimaryField: string;
    aliasFieldName: string;
    fieldType: string;
    fieldDataType: string;
    fieldLength: string;
    allowedValues: string;
    displayOptions: string;
    initializeValue?: string;
    defaultValue: string;
    disableField?: string;
    hideField?: string;
    ValidationMessage?: string;
}

export interface RecordActionList {
    actionName: string;
    actionDisplayName: string;
    actionUrl: string;
    requestFields: string;
}

export interface AddResourceFieldList {
    fieldName: string;
    hideField: string;
    defaultValue: any;
    disableField: string;
    useValueFromHdr: string;
    hdrFieldName: string;
    mandatoryField: string;
}

export interface ViewResourceFieldList {
    fieldName: string;
    disableField: string;
    hideField: string;
}

export interface EditResourceFieldList {
    fieldName: string;
    disableField: string;
    hideField: string;
    mandatoryField: string;
}

export interface SearchFieldList {
    fieldName: string;
    hideField: string;
    defaultValue: string;
}

export interface DataResource {
    name: string;
    displayName: string;
    searchUrl: string;
    listUrl: string;
    addRecordUrl: string;
    updateRecordUrl: string;
    deleteRecordUrl: string;
    fieldList: FieldList[];
    searchFields: string;
    listFields: string;
    recordActionList: RecordActionList[];
    primaryDtlResource: PrimaryDtlResource;
    dtlResources: DtlResource[];
    addResourceFieldList: AddResourceFieldList[];
    viewResourceFieldList: ViewResourceFieldList[];
    editResourceFieldList: EditResourceFieldList[];
    searchFieldList: SearchFieldList[];
}

export interface DtlResource {
    name: string;
    displayName: string;
    searchUrl: string;
    listUrl: string;
    addRecordUrl: string;
    updateRecordUrl: string;
    deleteRecordUrl: string;
    fieldList: FieldList[];
    listFields: string;
    addResourceFieldList: AddResourceFieldList[];
    viewResourceFieldList: ViewResourceFieldList[];
    editResourceFieldList: EditResourceFieldList[];
    hdrDisplayFields: string;
}

export interface PrimaryDtlResource {
    name: string;
    displayName: string;
    searchUrl: string;
    listUrl: string;
    addRecordUrl: string;
    updateRecordUrl: string;
    deleteRecordUrl: string;
    fieldList: FieldList[];
    listFields: string;
    addResourceFieldList: AddResourceFieldList[];
    viewResourceFieldList: ViewResourceFieldList[];
    editResourceFieldList: EditResourceFieldList[];
    hdrDisplayFields: string;
}

export interface ScreenResourceList {
    screenName: string;
    screenDisplayName: string;
    screenTitle: string;
    screenAccess: string;
    screenType: string;
    dataResource: DataResource;
}

export interface RfFieldResourceList {
    fieldName: string;
    fieldType: string;
    defaultValue: any;
    fieldDisplayName: string;
    fieldDataType: string;
    hideField: string;
    fieldLength: string;
    dataUrl: string;
    dataTriggerErrorMsg: string;
    userInputNeeded: string;
    validateInputWithField: string;
    validationFailedErrorMsg: string;
    continueInNextScreen: string;
    inputListToActionUrl: string;
	actionUrl: string;
    initializeValue?: any;
    dataTriggerMethod?: string;
    stickyField?: boolean;
    dataTriggerUrl?: string;
}

export interface ButtonResource {
    name: string;
    displayName: string;
    confirmationMsg: string;
    actionUrl: string;
    inputFieldListToActionUrl: string;
    resetFieldAfterConfirm: string;
    exitScreen: string;
}

export interface RfScreenResourceList {
    screenName: string;
    screenDescription: string;
    screenAccessLevel: string;
    screenDisplayName: string;
    screenTitle: string;
    screenAccess: string;
    screenType: string;
    widthOfScreen: number;
    heightOfScreen: number;
    rfFieldResourceList: RfFieldResourceList[];
    buttonResources: ButtonResource[];
}

export interface MenuResourceList {
    menuName: string;
    screenResourceList?: ScreenResourceList[];
    menuType: string;
    rfScreenResourceList?: RfScreenResourceList[];
}

export interface Tile {
    name: string;
    description: string;
    type: string;
    url: string;
}

export interface DashboardResource {
    screenName: string;
    screenDisplayName: string;
    screenTitle: string;
    screenAccess: string;
    screenType: string;
    tiles: Tile[];
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
    theme: string;
    menuType: string;
    userType: string;
    userId: string;
    menuResourceList: MenuResourceList[];
    dashboardResource: DashboardResource;
}
