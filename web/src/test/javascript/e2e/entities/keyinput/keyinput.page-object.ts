import { element, by, ElementFinder } from 'protractor';

export class KeyinputComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-keyinput div table .btn-danger'));
    title = element.all(by.css('jhi-keyinput div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class KeyinputUpdatePage {
    pageTitle = element(by.id('jhi-keyinput-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    questionInput = element(by.id('field_question'));
    macAnsInput = element(by.id('field_macAns'));
    winAnsInput = element(by.id('field_winAns'));
    typeSelect = element(by.id('field_type'));
    clickAmountInput = element(by.id('field_clickAmount'));
    targetMachineSelect = element(by.id('field_targetMachine'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setQuestionInput(question) {
        await this.questionInput.sendKeys(question);
    }

    async getQuestionInput() {
        return this.questionInput.getAttribute('value');
    }

    async setMacAnsInput(macAns) {
        await this.macAnsInput.sendKeys(macAns);
    }

    async getMacAnsInput() {
        return this.macAnsInput.getAttribute('value');
    }

    async setWinAnsInput(winAns) {
        await this.winAnsInput.sendKeys(winAns);
    }

    async getWinAnsInput() {
        return this.winAnsInput.getAttribute('value');
    }

    async setTypeSelect(type) {
        await this.typeSelect.sendKeys(type);
    }

    async getTypeSelect() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    }

    async typeSelectLastOption() {
        await this.typeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setClickAmountInput(clickAmount) {
        await this.clickAmountInput.sendKeys(clickAmount);
    }

    async getClickAmountInput() {
        return this.clickAmountInput.getAttribute('value');
    }

    async setTargetMachineSelect(targetMachine) {
        await this.targetMachineSelect.sendKeys(targetMachine);
    }

    async getTargetMachineSelect() {
        return this.targetMachineSelect.element(by.css('option:checked')).getText();
    }

    async targetMachineSelectLastOption() {
        await this.targetMachineSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class KeyinputDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-keyinput-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-keyinput'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
