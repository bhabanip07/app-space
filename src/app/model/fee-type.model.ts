export class FeeTypeModel {
    public id: string;
    public feeType: string;
    public fee: string;
    public dueDate: Date;
    public licenseCondition_Id: string; // for one-many relation ship


    // constructor(dept_id, dept_name){
    //     this.dept_id = dept_id;
    //     this.dept_name = dept_name;
    // }
}