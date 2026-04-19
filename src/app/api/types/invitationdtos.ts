export interface InviteRecruiterDto {
    invitedEmail: string;
    type: string;
  }
  
  export interface InviteMultipleRecruiterDto {
    invitedEmail: string[];
    rtype: string;
  }
  
  export interface RespondInvitationDto {
    token: string;
    response: "accepted" | "rejected";
    password: string;
    username: string;
    fullname: string;
  }
  