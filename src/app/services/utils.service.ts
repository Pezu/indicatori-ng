import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export class Utils {

    static cloneObject(original: any): any {
        return JSON.parse(JSON.stringify(original));
    }

    static stringCanBeEmail(entry: String): Boolean {
        const condition = /\S+@\S+\.\S+/;
        if (entry === null || entry === undefined || entry === '') {
            return true; // empty String
        } else {
            return condition.test(entry.valueOf());
        }
    }

    static stringCanContainOnlyNumbers(entry: String): Boolean {
        const condition = /^[0-9]*$/;
        if (entry === null || entry === undefined || entry === '') {
            return true; // empty String
        } else {
            return condition.test(entry.valueOf());
        }
    }

    static stringCanBeWebsite(entry: String): Boolean {
        const condition = /^(http(s?):\/\/)?(www.)?(\w|-)+(\.(\w|-)+)*((\.[a-zA-Z]{2,3})|\.(aero|coop|info|museum|name))+(\/)?$/;
        if (entry === null || entry === undefined || entry === '') {
            return true; // empty String
        } else {
            return condition.test(entry.valueOf());
        }
    }

    static stringCanContainOnlyLetersAndSpaces(entry: String): Boolean {
        const condition = /^[a-zA-Z\s]+$/;
        if (entry === null || entry === undefined || entry === '') {
            return true; // empty String
        } else {
            return condition.test(entry.valueOf());
        }
    }

    static stringCanBeOnlyAlfanumeric(entry: String): Boolean { // WO. spaces
        const condition = /^[a-zA-Z0-9]+$/;
        if (entry === null || entry === undefined || entry === '') {
            return true; // empty String
        } else {
            return condition.test(entry.valueOf());
        }
    }

    static stringCanBeOnlyAlfanumericWithSpaces(entry: String): Boolean { // WO. spaces
        const condition = /^[a-zA-Z0-9\s]+$/;
        if (entry === null || entry === undefined || entry === '') {
            return true; // empty String
        } else {
            return condition.test(entry.valueOf());
        }
    }

    static stringCanBeOnlyAlfanumericWithSpacesAndParanthesis(entry: String): Boolean { // WO. spaces
        const condition = /^[a-zA-Z0-9\s()]+$/;
        if (entry === null || entry === undefined || entry === '') {
            return true; // empty String
        } else {
            return condition.test(entry.valueOf());
        }
    }

    static canBeNgbDate(entry: any): Boolean {
        if (entry === null || entry === undefined || entry === '') { return true; } // empty String
        if (!(entry.year === undefined)) { return true; }
        return false;
    }

}
