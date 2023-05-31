import { Component } from '@angular/core';
import { Model } from './model/Model';
import RandomIndex from './enum/Ri';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './styles/styles.component.css',
    ]
})
export class AppComponent {
    title = 'Hệ hỗ trợ ra quyết định'

    iOption!: number
    iCriteria!: number
    checkInsertUndefined!: boolean | undefined
    checkInsertValue!: boolean | undefined
    checkInsertTable!: boolean
    checkCriteria = false
    checkPlan = false
    checkResult = false
    checkFinal = false

    // Insert Table
    options: Model[] = []
    criterion: Model[] = []
    giatri = new Array()

    trongso_row: Model[] = []
    trongso_col: Model[] = []
    gtri = new Array()

    trongso1_row: Model[] = []
    trongso1_col: Model[] = []
    gtri1 = new Array()

    // 1st Criteria Table
    _criteria1_row: Model[] = []
    _criteria1_col: Model[] = []
    giatri1 = new Array()

    // 2nd Criteria Table
    _criteria2_row: Model[] = []
    _criteria2_col: Model[] = []
    giatri2 = new Array()

    // 3rd Criteria Table
    _criteria3_row: Model[] = []
    _criteria3_col: Model[] = []
    giatri3 = new Array()

    // 4th Criteria Table
    _criteria4_row: Model[] = []
    _criteria4_col: Model[] = []
    giatri4 = new Array()
    lamdaMax = 0;
    consistencyIndex = 0
    consistencyRatio = 0

    // 1st Plan Table
    options1_row: Model[] = []
    options1_col: Model[] = []
    value1 = new Array()

    // 2nd Plan Table
    options2_row: Model[] = []
    options2_col: Model[] = []
    value2 = new Array()

    // 3rd Plan Table
    options3_row: Model[] = []
    options3_col: Model[] = []
    value3 = new Array()

    // 4th Plan Table
    options4_row: Model[] = []
    options4_col: Model[] = []
    value4 = new Array()

    insert(): void {
        if ((this.options === undefined || this.iCriteria === undefined) || (Number(this.iOption === 0 || Number(this.iCriteria) === 0))) {
            this.checkInsertUndefined = true
            this.checkInsertValue = false
            this.checkInsertTable = false
            this.checkCriteria = false
            this.checkPlan = false
        } else {
            this.checkInsertUndefined = false
            this.checkInsertTable = true
            this.checkCriteria = false
            this.checkPlan = false
            this.iOption = Number(this.iOption)
            this.iCriteria = Number(this.iCriteria)

            if (Number.isNaN(this.iOption) || Number.isNaN(this.iCriteria)) {
                this.iOption = 0
                this.iCriteria = 0
                this.checkInsertValue = true
                this.checkInsertTable = false
            } else {
                this.checkInsertValue = false
                this.checkInsertTable = true

                this.options.length = this.iOption;
                for (let index = 0; index < this.options.length; index++) {
                    this.options[index] = new Model('')
                    this.giatri[index] = new Array()
                    this.giatri[index].length = this.iCriteria
                }

                this.criterion.length = this.iCriteria + 1
                for (let idx = 0; idx < this.criterion.length; idx++) {
                    this.criterion[idx] = new Model('')
                }

                this.trongso_row.length = 1;
                for (let index = 0; index < this.trongso_row.length; index++) {
                    this.trongso_row[index] = new Model('Trọng số')
                    this.gtri[index] = new Array()
                    this.gtri[index].length = this.iCriteria
                }

                this.trongso_col.length = this.iCriteria + 1
                for (let index = 0; index < this.trongso_col.length; index++) {
                    this.trongso_col[index] = this.criterion[index]
                }
            }
        }
    }

    closeInsertUndefined(): void {
        this.checkInsertUndefined = false
    }

    closeInsertValue(): void {
        this.checkInsertValue = false
    }

    insertCriteria(event: any, idx: number): void {
        for (let index = 0; index < this.criterion.length; index++) {
            if (idx === index) {
                this.criterion[index].elName = event.target.value
            }
        }
    }

    insertoption(event: any, idx: number): void {
        for (let index = 0; index < this.options.length; index++) {
            if (idx === index) {
                this.options[idx].elName = event.target.value
            }
        }
    }

    criteria(): void {
        if (this.checkInsertUndefined === false) {
            if (this.checkInsertValue === false) {
                this.checkCriteria = true
                this.checkPlan = false
                this.checkResult = false

                // 1st Criteria Table
                this._criteria1_row.length = this.iCriteria
                for (let index = 0; index < this._criteria1_row.length; index++) {
                    this._criteria1_row[index] = this.criterion[index + 1];
                    this.giatri1[index] = new Array()
                    this.giatri1[index].length = this.iCriteria
                }

                this._criteria1_col.length = this.iCriteria + 1;
                for (let index = 0; index < this._criteria1_col.length; index++) {
                    this._criteria1_col[index] = this.criterion[index]
                }

                for (let index = 0; index < this._criteria1_row.length; index++) {
                    for (let idx = 0; idx < this.iCriteria; idx++) {
                        if (idx - index === 0) {
                            this.giatri1[index][idx] = 1
                        }
                    }
                }
            }
        }
    }

    plan(): void {
        if (this.checkInsertUndefined === false) {
            if (this.checkInsertValue === false) {
                this.checkPlan = true
                this.checkCriteria = false
                this.checkResult = false

                // 1st Plan Table
                this.options1_row.length = this.iOption
                for (let index = 0; index < this.options1_row.length; index++) {
                    this.options1_row[index] = this.options[index];
                    this.value1[index] = new Array()
                    this.value1[index].length = this.iOption
                }

                this.options1_col.length = this.iOption + 1
                for (let index = 0; index < this.options1_col.length; index++) {
                    if (index !== 0) {
                        this.options1_col[index] = this.options[index - 1]
                    }
                }

                for (let index = 0; index < this.options1_row.length; index++) {
                    for (let idx = 0; idx < this.iOption; idx++) {
                        if (idx - index === 0) {
                            this.value1[index][idx] = 1
                        }
                    }
                }
            }
        }
    }

    result(): void {
        this.lamdaMax = 0
        this.checkResult = true

        if (this.checkCriteria) {
            // 2nd Criteria Table
            this._criteria2_row.length = this.iCriteria + 1
            for (let index = 0; index < this._criteria2_row.length; index++) {
                this._criteria2_row[index] = this.criterion[index + 1]
                this.giatri2[index] = new Array()
                this.giatri2[index].length = this.iCriteria

                if (index === (this._criteria2_row.length - 1)) {
                    this._criteria2_row[index] = new Model('Sum')
                }
            }

            this._criteria2_col.length = this.iCriteria + 1
            for (let index = 0; index < this._criteria2_col.length; index++) {
                this._criteria2_col[index] = this.criterion[index]
            }

            for (let index = 0; index < this.iCriteria; index++) {
                for (let idx = 0; idx < this._criteria2_row.length; idx++) {
                    if (idx !== this._criteria2_row.length - 1) {
                        this.giatri2[idx][index] = 0
                        this.giatri2[idx][index] = this.giatri1[idx][index]
                    } else {
                        this.giatri2[idx][index] = 0

                        for (let i = 0; i < this.iCriteria; i++) {
                            this.giatri2[idx][index] += this.giatri1[i][index]
                        }
                    }
                }
            }

            // 3rd Criteria Table
            this._criteria3_row.length = this.iCriteria + 1
            for (let index = 0; index < this._criteria3_row.length; index++) {
                this._criteria3_row[index] = this.criterion[index + 1]
                this.giatri3[index] = new Array()
                this.giatri3[index].length = this.iCriteria

                if (index === (this._criteria3_row.length - 1)) {
                    this._criteria3_row[index] = new Model('Criteria Weights')
                }
            }

            this._criteria3_col.length = this.iCriteria + 1
            for (let index = 0; index < this._criteria3_col.length; index++) {
                this._criteria3_col[index] = this.criterion[index]
            }

            for (let index = 0; index < this.iCriteria; index++) {
                for (let idx = 0; idx < this._criteria3_row.length; idx++) {
                    if (idx !== this._criteria3_row.length - 1) {
                        this.giatri3[idx][index] = 0
                        this.giatri3[idx][index] = this.giatri2[idx][index] / this.giatri2[this._criteria2_row.length - 1][index]
                    }
                }
            }

            for (let index = 0; index < this.iCriteria; index++) {
                for (let idx = 0; idx < this._criteria3_row.length; idx++) {
                    if (idx === this._criteria3_row.length - 1) {
                        this.giatri3[idx][index] = 0

                        for (let i = 0; i < this.iCriteria; i++) {
                            this.giatri3[idx][index] += this.giatri3[index][i]
                        }

                        this.giatri3[idx][index] /= this.iCriteria
                    }
                }
            }

            // 4th Criteria Table
            this._criteria4_row.length = this.iCriteria + 3;
            for (let index = 0; index < this._criteria4_row.length; index++) {
                this._criteria4_row[index] = this.criterion[index + 1]
                this.giatri4[index] = new Array()
                this.giatri4[index].length = this.iCriteria

                if (index === (this._criteria4_row.length - 3)) {
                    this._criteria4_row[index] = new Model('Weighted Sum Value')
                } else if (index === (this._criteria4_row.length - 2)) {
                    this._criteria4_row[index] = new Model('Weighted Criteria')
                } else if (index === (this._criteria4_row.length - 1)) {
                    this._criteria4_row[index] = new Model('Consistency Vector')
                }
            }

            this._criteria4_col.length = this.iCriteria + 1;
            for (let index = 0; index < this._criteria4_col.length; index++) {
                this._criteria4_col[index] = this.criterion[index]
            }

            for (let index = 0; index < this.iCriteria; index++) {
                for (let idx = 0; idx < this._criteria4_row.length; idx++) {
                    if (idx < this.iCriteria) {
                        this.giatri4[idx][index] = 0
                        this.giatri4[idx][index] = this.giatri1[idx][index] * this.giatri3[this._criteria3_row.length - 1][index]
                    }
                }
            }

            for (let index = 0; index < this.iCriteria; index++) {
                for (let idx = 0; idx < this._criteria4_row.length; idx++) {
                    if (idx === this.iCriteria) {
                        this.giatri4[idx][index] = 0

                        for (let i = 0; i < this.iCriteria; i++) {
                            this.giatri4[idx][index] += this.giatri4[index][i]
                        }
                    } else if (idx === this.iCriteria + 1) {
                        this.giatri4[idx][index] = 0;
                        this.giatri4[idx][index] = this.giatri3[this._criteria3_row.length - 1][index]
                    }
                }
            }

            for (let index = 0; index < this.iCriteria; index++) {
                for (let idx = 0; idx < this._criteria4_row.length; idx++) {
                    if (idx === this.iCriteria + 2) {
                        this.giatri4[idx][index] = 0
                        this.giatri4[idx][index] = this.giatri4[idx - 2][index] / this.giatri4[idx - 1][index]
                    }
                }
            }

            // Value after calculating 4th table
            for (let index = 0; index < this.iCriteria; index++) {
                for (let idx = 0; idx < this._criteria4_row.length; idx++) {
                    if (idx === this.iCriteria + 2) {
                        this.lamdaMax += this.giatri4[idx][index]
                    }
                }
            }

            this.lamdaMax /= this.iCriteria
            this.consistencyIndex = (this.lamdaMax - this.iCriteria) / (this.iCriteria - 1)

            switch (this.iCriteria) {
                case 1:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n1
                    break
                case 2:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n2
                    break
                case 3:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n3
                    break
                case 4:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n4
                    break
                case 5:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n5
                    break
                case 6:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n6
                    break
                case 7:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n7
                    break
                case 8:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n8
                    break
                case 9:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n9
                    break
                case 10:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n10
                    break
                case 11:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n11
                    break
                case 12:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n12
                    break
                case 13:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n13
                    break
                case 14:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n14
                    break
                case 15:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n15
                    break
            }
        }

        if (this.checkPlan) {
            // 2nd Plan Table
            this.options2_row.length = this.iOption + 1
            for (let index = 0; index < this.options2_row.length; index++) {
                this.options2_row[index] = this.options[index]
                this.value2[index] = new Array()
                this.value2[index].length = this.iOption

                if (index === (this.options2_row.length - 1)) {
                    this.options2_row[index] = new Model('Sum')
                }
            }

            this.options2_col.length = this.iOption + 1;
            for (let index = 0; index < this.options2_col.length; index++) {
                if (index !== 0) {
                    this.options2_col[index] = this.options[index - 1]
                }
            }

            for (let index = 0; index < this.iOption; index++) {
                for (let idx = 0; idx < this.options2_row.length; idx++) {
                    if (idx !== this.options2_row.length - 1) {
                        this.value2[idx][index] = 0
                        this.value2[idx][index] = this.value1[idx][index]
                    } else {
                        this.value2[idx][index] = 0

                        for (let i = 0; i < this.iOption; i++) {
                            this.value2[idx][index] += this.value1[i][index]
                        }
                    }
                }
            }

            // 3rd Criteria Table
            this.options3_row.length = this.iOption + 1
            for (let index = 0; index < this.options3_row.length; index++) {
                this.options3_row[index] = this.options[index]
                this.value3[index] = new Array()
                this.value3[index].length = this.iOption

                if (index === (this.options3_row.length - 1)) {
                    this.options3_row[index] = new Model('Criteria Weights')
                }
            }

            this.options3_col.length = this.iOption + 1
            for (let index = 0; index < this.options3_col.length; index++) {
                if (index !== 0) {
                    this.options3_col[index] = this.options[index - 1]
                }
            }

            for (let index = 0; index < this.iOption; index++) {
                for (let idx = 0; idx < this.options3_row.length; idx++) {
                    if (idx !== this.options3_row.length - 1) {
                        this.value3[idx][index] = 0
                        this.value3[idx][index] = this.value2[idx][index] / this.value2[this.options2_row.length - 1][index]
                    }
                }
            }

            for (let index = 0; index < this.iOption; index++) {
                for (let idx = 0; idx < this.options3_row.length; idx++) {
                    if (idx === this.options3_row.length - 1) {
                        this.value3[idx][index] = 0

                        for (let i = 0; i < this.iOption; i++) {
                            this.value3[idx][index] += this.value3[index][i]
                        }

                        this.value3[idx][index] /= this.iOption
                    }
                }
            }

            // 4th Criteria Table
            this.options4_row.length = this.iOption + 3
            for (let index = 0; index < this.options4_row.length; index++) {
                this.options4_row[index] = this.options[index]
                this.value4[index] = new Array()
                this.value4[index].length = this.iOption

                if (index === (this.options4_row.length - 3)) {
                    this.options4_row[index] = new Model('Weighted Sum Value')
                } else if (index === (this.options4_row.length - 2)) {
                    this.options4_row[index] = new Model('Weighted Criteria')
                } else if (index === (this.options4_row.length - 1)) {
                    this.options4_row[index] = new Model('Consistency Vector')
                }
            }

            this.options4_col.length = this.iOption + 1;
            for (let index = 0; index < this.options4_col.length; index++) {
                if (index !== 0) {
                    this.options4_col[index] = this.options[index - 1]
                }
            }

            for (let index = 0; index < this.iOption; index++) {
                for (let idx = 0; idx < this.options4_row.length; idx++) {
                    if (idx < this.iOption) {
                        this.value4[idx][index] = 0
                        this.value4[idx][index] = this.value1[idx][index] * this.value3[this.options3_row.length - 1][index]
                    }
                }
            }

            for (let index = 0; index < this.iOption; index++) {
                for (let idx = 0; idx < this.options4_row.length; idx++) {
                    if (idx === this.iOption) {
                        this.value4[idx][index] = 0

                        for (let i = 0; i < this.iOption; i++) {
                            this.value4[idx][index] += this.value4[index][i]
                        }
                    } else if (idx === this.iOption + 1) {
                        this.value4[idx][index] = 0;
                        this.value4[idx][index] = this.value3[this.options3_row.length - 1][index]
                    }
                }
            }

            for (let index = 0; index < this.iOption; index++) {
                for (let idx = 0; idx < this.options4_row.length; idx++) {
                    if (idx === this.iOption + 2) {
                        this.value4[idx][index] = 0
                        this.value4[idx][index] = this.value4[idx - 2][index] / this.value4[idx - 1][index]
                    }
                }
            }

            // Value after calculating 4th table
            for (let index = 0; index < this.iOption; index++) {
                for (let idx = 0; idx < this.options4_row.length; idx++) {
                    if (idx === this.iOption + 2) {
                        this.lamdaMax += this.value4[idx][index]
                    }
                }
            }

            this.lamdaMax /= this.iOption;
            this.consistencyIndex = (this.lamdaMax - this.iOption) / (this.iOption - 1)

            switch (this.iOption) {
                case 1:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n1
                    break
                case 2:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n2
                    break
                case 3:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n3
                    break
                case 4:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n4
                    break
                case 5:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n5
                    break
                case 6:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n6
                    break
                case 7:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n7
                    break
                case 8:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n8
                    break
                case 9:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n9
                    break
                case 10:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n10
                    break
                case 11:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n11
                    break
                case 12:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n12
                    break
                case 13:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n13
                    break
                case 14:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n14
                    break
                case 15:
                    this.consistencyRatio = this.consistencyIndex / RandomIndex.n15
                    break
            }
        }
    }

    final(): void {
        if (this.checkInsertTable) {
            this.checkFinal = true

            this.trongso1_row.length = 1;
            for (let index = 0; index < this.trongso1_row.length; index++) {
                this.trongso1_row[index] = new Model('Ranking')
                this.gtri1[index] = new Array()
                this.gtri1[index].length = this.iOption
            }

            this.trongso1_col.length = this.iOption + 1
            for (let index = 0; index < this.trongso1_col.length; index++) {
                if (index !== 0) {
                    this.trongso1_col[index] = this.options[index - 1]
                }
            }

            for (let index = 0; index < this.options.length; index++) {
                this.gtri1[0][index] = 0

                for (let idx = 0; idx < this.iCriteria; idx++) {
                    this.gtri1[0][index] += (this.giatri[index][idx] * this.gtri[0][idx])
                }
            }
        }
    }

    reset(): void {
        window.location.reload()
    }

    handleInsert(event: any, row: number, col: number): void {
        let position = 0

        for (let index = 0; index < this.options.length; index++) {
            for (let idx = 0; idx < this.iCriteria; idx++) {
                let str = ''

                str = String(event.target.value)
                position = str.indexOf('/')

                if (row === index && col === idx) {
                    if (str.indexOf('/') !== -1) {
                        this.giatri[index][idx] = 0
                        this.giatri[index][idx] = (Number(str.slice(0, position)) / Number(str.slice(position + 1)))

                    } else {
                        this.giatri[index][idx] = Number(event.target.value)
                    }
                }
            }
        }
    }

    handleCriteria(event: any, row: number, col: number): void {
        let position = 0;

        for (let index = 0; index < this.trongso_row.length; index++) {
            for (let idx = 0; idx < this.iCriteria; idx++) {
                let str = ''

                str = String(event.target.value)
                position = str.indexOf('/')

                if (row === index && col === idx) {
                    if (str.indexOf('/') !== -1) {
                        this.gtri[index][idx] = 0
                        this.gtri[index][idx] = (Number(str.slice(0, position)) / Number(str.slice(position + 1)))
                    } else {
                        this.gtri[index][idx] = Number(event.target.value)
                    }
                }
            }
        }
    }

    handleGiaTri(event: any, row: number, col: number): void {
        let position = 0

        for (let index = 0; index < this._criteria1_row.length; index++) {
            for (let idx = 0; idx < this.iCriteria; idx++) {
                let str = ''

                str = String(event.target.value)
                position = str.indexOf('/')

                if (row === index && col === idx) {
                    if (str.indexOf('/') !== -1) {
                        this.giatri1[index][idx] = 0
                        this.giatri1[index][idx] = (Number(str.slice(0, position)) / Number(str.slice(position + 1)))
                    } else {
                        this.giatri1[index][idx] = Number(event.target.value)
                    }
                }
            }
        }
    }

    handleValue(event: any, row: number, col: number): void {
        let position = 0;

        for (let index = 0; index < this.options1_row.length; index++) {
            for (let idx = 0; idx < this.iOption; idx++) {
                let str = ''

                str = String(event.target.value);
                position = str.indexOf('/')

                if (row === index && col === idx) {
                    if (str.indexOf('/') !== -1) {
                        this.value1[index][idx] = 0
                        this.value1[index][idx] = (Number(str.slice(0, position)) / Number(str.slice(position + 1)))
                    } else {
                        this.value1[index][idx] = Number(event.target.value)
                    }
                }
            }
        }
    }
}