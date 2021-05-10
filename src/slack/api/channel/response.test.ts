import { failed } from '../../../testutil/fail';
import { isResponse, Response } from './response';

describe('isResponse', () => {
    test('when the argument type is valid Response, it returns true', () => {
        expect(
            isResponse({
                ok: true,
                channel: {
                    id: 'aaaaaa',
                },
            })
        ).toBe(true);
    });

    test('when isResponse is true, arg be treated as Response type', () => {
        const r = {
            ok: true,
            channel: {
                id: 'aaaaaa',
            },
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const check = (_u: Response) => true;
        if (isResponse(r)) {
            expect(check(r)).toBe(true);
        } else {
            failed('arg is not Response type');
        }
    });

    describe('when the arg is invalid, it returns false', () => {
        test('when `ok` is false', () => {
            expect(
                isResponse({
                    ok: false,
                    channel: {
                        id: 'aaaaaa',
                    },
                })
            ).toBe(false);
        });

        test('when `channel` is none', () => {
            expect(
                isResponse({
                    ok: true,
                })
            ).toBe(false);
        });

        test('when `channel` is empty', () => {
            expect(
                isResponse({
                    ok: true,
                    channel: {},
                })
            ).toBe(false);
        });

        test('when `channel.id` is empty string', () => {
            expect(
                isResponse({
                    ok: true,
                    channel: {
                        id: '',
                    },
                })
            ).toBe(false);
        });
    });
});
