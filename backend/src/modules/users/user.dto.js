import { z } from "zod";
export const UpdateProfileDto = z.object({
    name: z.string().min(1, "Name is required"),
});
//# sourceMappingURL=user.dto.js.map