import { element, by, ElementFinder } from 'protractor';

export class TaskComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-task div table .btn-danger'));
    title = element.all(by.css('jhi-task div h2#page-heading span')).first();

    async clickOnCreateButton(timeout?: number) {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton(timeout?: number) {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class TaskUpdatePage {
    pageTitle = element(by.id('jhi-task-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    questionInput = element(by.id('field_question'));
    descriptionInput = element(by.id('field_description'));
    answerInput = element(by.id('field_answer'));
    typeSelect = element(by.id('field_type'));
    targetMachineSelect = element(by.id('field_targetMachine'));
    sectionSelect = element(by.id('field_section'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setQuestionInput(question) {
        await this.questionInput.sendKeys(question);
    }

    async getQuestionInput() {
        return await this.questionInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return await this.descriptionInput.getAttribute('value');
    }

    async setAnswerInput(answer) {
        await this.answerInput.sendKeys(answer);
    }

    async getAnswerInput() {
        return await this.answerInput.getAttribute('value');
    }

    async setTypeSelect(type) {
        await this.typeSelect.sendKeys(type);
    }

    async getTypeSelect() {
        return await this.typeSelect.element(by.css('option:checked')).getText();
    }

    async typeSelectLastOption(timeout?: number) {
        await this.typeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setTargetMachineSelect(targetMachine) {
        await this.targetMachineSelect.sendKeys(targetMachine);
    }

    async getTargetMachineSelect() {
        return await this.targetMachineSelect.element(by.css('option:checked')).getText();
    }

    async targetMachineSelectLastOption(timeout?: number) {
        await this.targetMachineSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async sectionSelectLastOption(timeout?: number) {
        await this.sectionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async sectionSelectOption(option) {
        await this.sectionSelect.sendKeys(option);
    }

    getSectionSelect(): ElementFinder {
        return this.sectionSelect;
    }

    async getSectionSelectedOption() {
        return await this.sectionSelect.element(by.css('option:checked')).getText();
    }

    async save(timeout?: number) {
        await this.saveButton.click();
    }

    async cancel(timeout?: number) {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class TaskDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-task-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-task'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton(timeout?: number) {
        await this.confirmButton.click();
    }
}
