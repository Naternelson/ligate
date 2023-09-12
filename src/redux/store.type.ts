import { User } from "firebase/auth";

/**
 * Represents a profile with personal details of the user.
 */
export type Profile = Partial<
	{
		id: string;
		firstName: string;
		lastName: string;
		gender: string;
		pronouns: string;
		birthdate: string;
        images: string[];
	} & Address
>;

/**
 * Represents an address with standard fields.
 */
export type Address = Partial<{
	streetAddress: string;
	streetAddress2: string;
	city: string;
	state: string;
	zip: string;
	country: string;
}>;

/**
 * Represents a specific permission.
 */
export type Permission = Partial<{
	id: string;
	name: string;
	description: string;
}>;

/**
 * Represents a user's role and associated permissions.
 */
export type Role = Partial<{
	id: string;
	name: string;
	permissions: Permission["id"][];
}>;

/**
 * Represents a specific calling or assignment.
 */
export type Calling = Partial<{
	id: string;
	name: string; // e.g. "Elder's Quorum President"
	title: string; // e.g. "Elder" or any other title
	unit: Unit;
	calledDate: string;
	sustainedDate: string;
	releasedDate: string;
    memberIds: string[];
}>;

/**
 * Represents the various types of units.
 */
export type UnitType =
	| "standard"
	| "ysa"
	| "singles"
	| "student"
	| "incarcerated"
	| "military"
	| "senior"
	| "district"
	| "branch"
	| "special-language"
	| "other";

/**
 * Represents a unit with its type, variant, and associated details.
 */
export type Unit = Partial<
	{
		id: string;
		name: string;
		scope: "area" | "stake" | "ward" | "mission";
		variant: UnitType;
		language: string;
		parentUnit: Unit;
		childrenUnits: Unit[];
		roles: {
			data: {
				[userId: string]: {
					role: Role;
				} & Profile;
			};
			users: string[];
		};
	} & Address
>;

/**
 * Represents the authentication state and associated details of the user.
 */
export type AuthState = Partial<{
	user: Partial<
		Profile & {
			id: User["uid"];
			displayName: User["displayName"];
			email: User["email"];
			emailVerified: User["emailVerified"];
			isAnonymous: User["isAnonymous"];
			phoneNumber: User["phoneNumber"];
			photoURL: User["photoURL"];
			providerData: User["providerData"];
			providerId: User["providerId"];
			refreshToken: User["refreshToken"];
			tenantId: User["tenantId"];
			uid: User["uid"];
			profileId: string;
		}
	> | null;
	userSignedIn: boolean;
	unit: Unit[] | null;
	calling: Calling[] | null;
	role: Role[] | null;
}>;

/**
 * Represents the members state of the application.
 */
export type MemberData = Partial<Profile & {
    unit: Unit
    id: string;
    calling: Calling[];
    uid: string;
    templeRecommend: boolean;
    activity: string
    addressConfirmed: boolean; 
}>

/**
 * Represents the main state of the application.
 */
export interface AppState {
	auth?: AuthState;
	units?: {
		data: { [unitID: string]: Unit };
		unitIds: string[];
	};
    members?: {
        data: { [memberID: string]: MemberData };
        memberIds: string[];
    }
}
