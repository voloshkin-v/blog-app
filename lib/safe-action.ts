import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { createSafeActionClient, DEFAULT_SERVER_ERROR } from 'next-safe-action';

export const action = createSafeActionClient({
    handleReturnedServerError(e) {
        if (e instanceof PrismaClientValidationError) {
            return DEFAULT_SERVER_ERROR;
        }

        return e.message;
    },
});
