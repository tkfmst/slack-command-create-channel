import * as UseCase from '../slack/useCase';
import { Factory } from './factory';

export class SetUsersAndGroups {
    useCase: UseCase.SetUsersAndGroups;

    constructor(factory: Factory) {
        this.useCase = new UseCase.SetUsersAndGroups(
            factory.api.user,
            factory.api.userGroup,
            factory.repository.user,
            factory.repository.userGroup
        );
    }

    main(): void {
        try {
            this.useCase.setUsersAndGroups();
        } catch (err) {
            console.log(
                SetUsersAndGroups.name,
                JSON.stringify({
                    message: err.message,
                    stack: err.stack,
                })
            );
        }
    }
}
