import axiosInstance from "../axiosModels/axiosInstance";
import { InviteRecruiterDto, InviteMultipleRecruiterDto, RespondInvitationDto } from "../types/invitationdtos";
import { AUTH_SERVER_URL } from "../endpoints";

interface InvitationError {
    response?: {
        data?: {
            message?: string;
        };
    };
    message?: string;
}

export async function inviteRecruiter(dto: InviteRecruiterDto) {
    try {
        const response = await axiosInstance.post(
            `${AUTH_SERVER_URL}/recruiter-invitations/invite`,
            dto
        );
        return { data: response.data, success: true };
    } catch (err) {
        const error = err as InvitationError;
        console.error("Error inviting recruiter:", error.response?.data?.message || error.message|| "" );
        return { success: false, message: error.response?.data?.message || error.message || ""};
    }
}

export async function inviteRecruiters(dto: InviteMultipleRecruiterDto) {
    try {
        const response = await axiosInstance.post(
            `${AUTH_SERVER_URL}/recruiter-invitations/invites`,
            dto
        );
        return { data: response.data, success: true };
    } catch (err) {
        const error = err as InvitationError;
        console.error("Error inviting recruiters:", error.response?.data?.message || error.message|| "");
        return { success: false, message: error.response?.data?.message || error.message|| "" };
    }
}

export async function respondToInvitation(dto: RespondInvitationDto) {
    try {
        const response = await axiosInstance.post(
            `${AUTH_SERVER_URL}/recruiter-invitations/respond`,
            dto
        );
        return { success: true, data: response.data };
    } catch (err) {
        const error = err as InvitationError;
        console.error("Error responding to invitation:", error.response?.data?.message || error.message|| "");
        return { success: false, message: error.response?.data?.message || error.message|| "" };
    }
}
