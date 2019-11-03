export class LicenseCondition {
    public id: number;
    public licenseCondition_Id: string; // for relationship with fee and reprts
    public licenseNumber: string;
    public licenseType: string; // dropdown
    public siteLocation: string; // dropdown
    public issueDate: Date;
    public expirationDate: Date;
    public renewalDate: Date;
    public possessionLimitsFlourine: number;
    public possessionLimitsNitrogen: number;
    public possessionLimitsOxygen: number;
    public possessionLimitsCarbon: number;
    public applicationFee: number;
    public applicationFeeDate: Date;
    public amendmentFee: string;
    public amendmentFeeDate: Date;
    public annualFee: string;
    public annualFeeDate: Date;
    public nonroutineInspectionFee: number;
    public nonroutineInspectionFeeDate: Date;
    public feePaymentInstruction: string;
    public lastFeeDate: Date;
    // public reportType: string; //moved to separet model
    // public reportAirDate: Date;
    // public reportWaterDate: Date;
    // public reportWasteDate: Date;
    public rso: string;
    public authorizedNuclearPharmacist: string;
    public authorizedUser: string;
    public cyclotronOperator: string;
    public physicalPresenceRequirement: string;
    public sealedSourceLeakTest: number;
    public sealedSourceInventory: number;
    public otherRequirements: string;

}
