export declare class Modal {
    private modalId;
    private element;
    private overlay;
    constructor(modalId: string);
    private initCloseListeners;
    show(): void;
    hide(): void;
    static confirm(message: string): Promise<boolean>;
}
//# sourceMappingURL=Modal.d.ts.map