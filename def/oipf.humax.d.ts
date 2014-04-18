/// <reference path="oipf.d.ts" />

interface HOipfObjectFactory extends OipfObjectFactory {
    createHumaxConfigurationObject: () => HMasterConfiguration;
    createHumaxStorageUtilObject: () => HStorageUtil;
    createHumaxOperatorFreesatObject: () => HOperatorFreesat;
    createContentManagerObject: () => HContentManager;
    createDlnaManagerObject: () => HDlna;
    //createWoonManagerObject: () => HTMLElement;
    createSambaManagerObject: () => HSamba;
    createMediaSearchManagerObject: () => any;
    createHumaxOperatorFeatureObject: () => any;
    createHumaxCasUtil: () => any;
}

/*
 * Media Local
 */
interface HContentManager {
    onContentBrowse: (contents: HContentCollection, state: number, ticket: number) => void;
    onContentScanSurvey: (state: number, path: string, ticket: number) => void;
    onContentOperate: (ticket: number, result: number) => void;
    onContentMonitor: (state: number, filepath: number) => void;
    reScan: (scanPath: string, bRecursive: boolean, extension: string) => number;
    startAutoScan: (cycleTime: number) => number;
    stopAutoScan: () => boolean;
    extensionMonitor: (extension: string) => boolean;
    autoCopy: (source: string, destination: string, bRecursive: boolean, extension: string) => number;
    copyContent: (source: string, destination: string, bRecursive: boolean, extension: string) => number;
    deleteContent: (source: string, destination: string, extension: string) => number;
    moveContent: (source: string, destination: string, bRecursive: boolean, extension: string) => number;
    makeDir: (foldername: string) => number;
    removeDir: (foldername: string) => number;
    hasFile: (path: string) => boolean;
    isExist: (path: string) => boolean;
    requestScanNotify: (path: string) => number;
    isScanning: (path: string) => void;
    stopFileOperation: (ticket: number) => number;
    getOperationState: (ticket: number) => number;
    browseContent: (browsePath: string, browseType: number, ReqItemCount: number, fileExt: string, sortType: number, rootPath: string) => number;
}
interface HContent {
    contentType: number;
    fileType: number;
    fullPath: string;
    date: string;
    thumbResolution: string;
    duration: number;
    lastViewTime: number;
    thumbnailUrl: string;
    resolution: string;
    pictureDate: string;
    title: string;
    genre: string;
    album: string;
    artist: string;
    watched: number;
    storageCategory: number;
}
interface HContentCollection extends Collection<HContent> {
}
/*
 * Media dLNA
 */
interface HDlna {
    dmp: HDlnaDmp;
    dmr: HDlnaDmr;
    dms: HDlnaDms;
}
interface HDlnaDmp {
    onCDSScan: (cds: HDlnaCds, state: number) => void;
    startScan: () => void;
    stopScan: () => void;
    refreshDms: (udn: string) => void;
    getAvailableCdsList: () => HDlnaCdsCollection;
}
interface HDlnaCdsCollection extends Collection<HDlnaCds> {
}
interface HDlnaCds {
    udn: string;
    friendlyName: string;
    ipAddress: string;
    onContentBrowse: (contents: HDlnaCdsContentCollection, state: number, parentID: string) => void;
    browseContent: (cid: string, sort: string, StartIdx: number, RequestItemCount: number) => void;
}
interface HDlnaCdsContentCollection extends Collection<HDlnaCdsContent> {
}
interface HDlnaCdsContent {
    objectID: string;
    parentID: string;
    class: string;
    restricted: boolean;
    objectType: string;
    importURI: string;
    thumbnailUrl: string;
    byteSeekAble: number;
    timeSeekAble: number;
    title: string;
    date: string;
    duration: string;
    resolution: string;
    digitalCopyControl: string;
    genre: string;
    childCount: number;
    album: string;
    artist: string;
}
interface HDlnaDmr {
    activated: boolean;
    started: boolean;
    friendlyName: string;
    onReqPlay: (item: HDlnaCdsContent, playSpeed: number) => void;
    onReqStop: () => void;
    onReqPause: () => void;
    onReqSeek: (position: number) => void;
    onReqSetVolume: (volume: number) => void;
    onReqMute: (mute: boolean) => void;
    start: () => void;
    stop: () => void;
    setMediaChange: (currentURI: string) => void;
}
interface HDlnaDms {
    onEventResult: (state: number) => void;
    started: boolean;
    friendlyName: string;
    start: () => void;
    stop: () => void;
}
/*
 * Media SAMBA
 */
interface HSamba {
    onScanResult: (server: HSambaServer, state: number) => void;
    onMountResult: (server: HSambaServer, state: number) => void;
    startScan: () => void;
    stopScan: () => void;
    mount: (server: HSambaServer) => void;
    unmount: (server: HSambaServer) => void;
    unmountAll: () => void;
}
interface HSambaServer {
    serverName: string;
    sharedName: string;
    ip: string;
    isMounted: boolean;
    log: string;
    mountPath: string;
    id: string;
    password: string;
}

interface HMasterConfiguration {
    configuration: HConfiguration;
    localSystem: HLocalSystem;
}

interface HConfiguration extends Configuration {
    
    /*
    Get opeartor ID.
    */
    operatorId: number;

    /*
    UI language
    */
    preferredMenuLanguage: string;

    /*

    */
    standbyPowerMode: number;

    automaticStandby: boolean;

    autoDelete: boolean;

    audioBleepEnabled: boolean;

    subtitleFontType: number;

    infoDisplayTimeout: number;

    timeShiftEnabled: boolean;

    skipForwardTime: number;

    instantReplayTime: number;

    firstTimeBoot: boolean;

    channelsetupPin: boolean;

    guidancepolicy: number;

    getField: (fieldName: string) => string;

    setField: (fieldName: string, value: string) => void;

    doFactoryDefault: (param?: string) => void;

    doDBRestore: (param1: string, param: number) => number;

    getCamNameBySlot: (param1: number) => string;
}

interface HLocalSystem extends LocalSystem {

    networkInterfaces: Collection<HNetworkInterface>;

    pairingDeviceUUID: string;

    hmx_outputs: Collection<HOutput>;

    hmx_audios: HAudio[];

    networkManager: any;

    frontPanel: any;

    swupdate: any;

    getField(fieldName: string): string;

    setField(fieldName: string, value: string): void;

    antennaInfoLists: any; // TODO: define specifically
}

interface HOutput {

    name: string;

    type: string;

    enabled: boolean;

    scartEnabled: boolean;

    compositeEnabled: boolean;

    componentEnabled: boolean;

    rfEnabled: boolean;

    hdmiEnabled: boolean;

    spdifEnabled: boolean;

    tvscartEnabled: boolean;

    tvscartFormat: string;

    supportedTvScartFormats: string[];

    vcrscartEnabled: boolean;

    vcrscartFormat: string;

    supportedVcrScartFormats: string[];

    videoStandard: string;

    avAdditionalSignal: string;

    tvAspectRatio: string;

    wss2hdmiMode: string;

    videoDisplayFormat: string;

    curResolution: string;

    supportedResolutions: string[];

    audioDescriptionEnabled: boolean;

    subtitleEnabled: boolean;

    hardOfHearingEnabled: boolean;
}

interface HAudio {

    name: string;

    type: string;

    enabled: boolean;

    maxVolume: number;

    minVolume: number;

    lipSyncDelay: number;

    soundMode: string;

    transcodingEnabled: boolean;

    modeDigitalAudioOutput: string;

    codecDigitalAudioOutput: string;

    modeTranscoding: string;

    supportedSoundModes: string[];

    supportedDigitalAudioOutputCodecs: string[];

    supportedDigitalAudioOutputModes: string[];

    supportedTranscodingModes: string[];

}

interface HNetworkManager {

    defaultDevIndex: number;

    linkStatus: number;

    getWifiConfig(): HNetworkWiFiConfig;

    getDMSConfig(): HNetworkDMSConfig;

    getFTPConfig(): HNetworkFTPConfig;

    onNetworkStatusChanged: { (networkStatus: number): void; };
}

interface HNetworkWiFiConfig {

    isConnectedAP(): number;

    apScanning(): number;

    setKey(key: string): void;

    applyConnectToAP(ap: HNetworkAccessPoint): number;

    getWaveStrength(): number;

    getConnectedAPInfo(): HNetworkAccessPoint;

    onAccessPointUpdated: { (state: number, ap: HNetworkAccessPoint): void; };
}

interface HNetworkDMSConfig {

    start(): number;
    
    stop(): number;

    actionStatus(); number;
}

interface HNetworkFTPConfig {

    FTPServerOn(): number;

    FTPServerOff(): number;
}

interface HNetworkInterface extends NetworkInterface {

    netmask: string;

    gateway: string;

    dns1st: string;

    dns2nd: string;

    networkType: number;

    dhcpOn: boolean;

    dnsAuto: boolean;

    ipv6Address: string;

    ipv6Prefix: number;

    ipv6Gateway: string;

    ipv6dns1st: string;

    ipv6dns2nd: string;

    ipv6dhcpOn: boolean;

    ipv6dnsAuto: boolean;

    applyConfigure();

    onLinkStatusChanged: { (linkStatus: number): void; };

}

interface HNetworkAccessPoint {

    essid: string;

    secure: number;

    authen: number;

    encrypt: number;

    waveStrength: number;

    connectSpeed: number;


}

interface HRecordingScheduler extends RecordingScheduler {
    recordings: RecordingCollection;
    record(programme: Programme, factoryType?: number): ScheduledRecording;
    recordAt(startTime: number, duration: number, repeatDays: number, channelID: string, factoryType?: number): ScheduledRecording;
    recordConfirm(scheduledRecording: ScheduledRecording, type: number, check: number);
    recordAlternative(scheduledRecording: ScheduledRecording);
    stop(recording: HRecording);
    onPVREvent: { (state: number, recording: HRecording, error: number, conflicts: HRecording[], alternatives: HRecording[]): void; };
    recordRemote();
}

interface HRecording extends Recording {
    thumbnail: string;

    isScheduledAsSeries: boolean;

    willBeDeleted: boolean;

    factoryType: number;

    seriesID: string;

    lastPlayPosition: string;
}

/*
interface HMetadataSearch extends MetadataSearch {

    addConstraint(type: string, param: string): void;
}
*/

/****************************************************************************
 * Storage utilties
 * @class
 */
interface HStorageUtil extends DOM3EventSource {

    /**
     * Deliever newly attached physical storage
     * @event
     * @param {HMXPhysicalStorage} physicalStorage Newly attached physical storage
     */
    onPhysicalStorageAttached: { (physicalStorage: HPhysicalStorage): void; };

    /**
     * Deliever detached physical storage
     * @event
     * @param {HMXPhysicalStorage} physicalStorage Detached physical storage
     */
    onPhysicalStorageDetached: { (physicalStorage: HPhysicalStorage): void; };

    /**
     * Get physical storage instances
     * @function
     * @returns {HMXPhysicalStorageCollection}
     */
    getPhysicalStorages(): HPhysicalStorage[];

    /**
     * Get supported file system type
     * @function
     * @returns {HMXPhysicalStorageCollection}
     */
    supportedFormatTypes(): string[];
}

interface HPhysicalStorage {

    /*
     * @property {number} id Unique ID for physical storage
     */
    id: number;

    /*
     * @property {number} interface Interface, 0:EInterfaceUnknown, 1:EInterfaceSATA, 2:EInterfaceUSB
     */
    interface: number;

    /*
     * @property {number} type Type, 0:ETypeUnknown, 1:ETypeInternal, 2:ETypeExternal
     */
    type: number;

    /*
     * @property {number} kind Kind, 0:EKindUnknown, 1:EKindHDD, 2:EKindUSBMemory, 3:
     */
    kind: number;

    /*
     * @property {number} usage Usage, 0:EUsageUnkown, 1:EUsagePVR, 2:EUsageStorage
     */
    usage: number;

    /*
     * @property {string} uuid UUID for the physical storage
     */
    uuid: string;

    /*
     * @property {number} availableSize Total space
     */
    availableSize: number;

    /*
     * @property {number} usedSize Total space
     */
    usedSize: number;

    /*
     * @property {number} reservedSize Total space
     */
    reservedSize: number;

    /*
     * @property {number} totalSize Total space
     */
    totalSize: number;

    /**
     * Get logical storage instances
     * @function
     * @returns {HMXLogicalStorageCollection}
     */
    getLogicalStorages(): HLogicalStorage[];

    /**
     * Format all logical storages with the new label
     * @function
     */
    formatAll();

    /**
     * Detach physical storage from STB device
     * @function
     */
    detach();

    /**
     * Check disk and recover if required
     * @function
     */
    recovery();

    pairing: boolean;

    /**
     * Deliver format progress information
     * @event
     * @param {number} status Status enum, 0: None, 1: Completed, 2: Detaching, 3: Error
     * @param {number} progress Number indicating format progress
     * @param {number} progressMax Maximum number for format progress
     * @param {string} errMessage Error message only valid if status is 3 (Error)
     */
    onFormatProgress: { (status: number, progress: number, progressMax: number, numbererrMessage: string): void; };

    /**
     * Deliver detach progress information
     * @event
     * @param {number} status Status enum, 0: None, 1: Completed, 2: Detaching, 3: Error
     * @param {string} errMessage Error message only valid if status is 3 (Error)
     */
    onDetachProgress: { (status: number, errMessage: string): void; };

    /**
     * Deliver recovery progress information
     * @event
     * @param {number} status Status enum, 0: None, 1: Completed, 2: Detaching, 3: Error
     * @param {number} progress Number indicating format progress
     * @param {number} progressMax Maximum number for format progress
     * @param {string} errMessage Error message only valid if status is 3 (Error)
     */
    onRecoveryProgress: { (status: number, progress: number, progressMax: number, errMessage: string): void; };



}

interface HLogicalStorage {
    id: number;
    label: string;
    path: string;
    isPVR: boolean;
    isAvailable: boolean;
}

interface HOperatorFreesat {
    name: string;
    postcode: string;
    bouquetname: string;
    simode: number;
    bouquetid: number;
    regioncode: number;
    adultchannels: boolean;
    onFreesatMetaFileUpdate: { (type:number, metaName) };
    onFreesatMhegEvent: { (type:number, bridgeUrl, fsatId) };
    onFreesatMhegAppState: { (type:number, appState, userData) };
    onFreesatMetaEpgEvent: { (type:number, epgState) };

    /**
     * Deliver youtube dial url
     * @event
     * @param {number} type app enum EAppType_Youtube : 0
     * @param {string} dialUrl contents url
     * @param {string} app Name
     */
    onFreesatDialEvent: { (type:number, dialUrl: string, appName: string)};
    listenHomeTp: Function;
    startMetaDownNow: Function;
    setDeepLinkForITV: Function;

    /**
     * set App state (when app start or finish)
     * @function
     * @param {string} appName
     * @param {number} state enum EAppState_Stop: 0, EAppState_Running: 1
     * @param {number} app url
     * @param {string} app svcid
     */
    setAppState: { (appName: string, state: number, appUrl: string, appSvcid: string)};


    /**
     * RC Event
     * @event
     * @param {number} default 0 (not use)
     * @param {string} rc request header
     * @param {string} rc request body
     */
    onFreesatRCEvent : { (type: number, rcHeader: string, rcBody: any) };

    /**
     * response for RC Event
     * @function
     * @param {number} error code
     * @param {string} response header (not use just null)
     * @param {number} response body length (not use just null)
     * @param {string} response body
     */
    responseHttpData: { (errorCode: number, resHeader: string, resBodyLen: number, resBody: string) };
}

interface TCasUiData {
    attribute: any;
    timeout: number;
    string: string;

    timeoutsecond: number;
    fontsize: number;
    posx: number;
    posy: number;
    width: number;
    height: number;
    bgcolor: number;
    fgcolor: number;
    progress: number;
    title: string;
    subtitle: string;
    bottom: string;
    textlength: number;
    text: string;
}

interface TCasUiEvent {
    uitype: string;
    uidata: TCasUiData;
}

declare var oipfObjectFactory: HOipfObjectFactory;