export const ROLE_GUEST = -3
export const ROLE_UNREGISTERED = -2
export const ROLE_PENDING = -1
export const ROLE_ADMIN = 0
export const ROLE_MANAGER = 1
export const ROLE_USER = 2

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const roles: { [key: number]: string } = {
  [ROLE_GUEST]: 'Guest',
  [ROLE_UNREGISTERED]: 'Unregistered',
  [ROLE_PENDING]: 'Pending',
  [ROLE_ADMIN]: 'Admin',
  [ROLE_MANAGER]: 'Manager',
  [ROLE_USER]: 'User'
}

export const getRoleByName = (name: string): number | undefined => {
  for (const key in roles) {
    if (roles[key] === name) {
      return parseInt(key, 10)
    }
  }

  return undefined
}

export const getRoleName = (roleIndex: number): string =>
  roles[roleIndex]
