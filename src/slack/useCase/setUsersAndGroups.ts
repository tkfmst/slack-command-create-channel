import * as User from '../api/user';
import * as UserGroup from '../api/userGroup';

export class SetUsersAndGroups {
    constructor(
        private readonly userApi: User.Api,
        private readonly userGroupApi: UserGroup.Api,
        private readonly userRepository: User.Repository,
        private readonly userGroupRepository: UserGroup.Repository
    ) {}

    setUsersAndGroups(): void {
        try {
            this.userRepository.setUserNameAndIds(
                this.userApi.getAllUsers().unwrapOrThrow()
            );
            this.userGroupRepository.setGroupNameAndUserIds(
                this.userGroupApi.getAllUserGroups().unwrapOrThrow()
            );
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
