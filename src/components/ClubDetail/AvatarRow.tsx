import { useMemo } from "react"
import { View } from "react-native"

import type { ClubDetail } from "@/services/api/types"
import { useAppTheme } from "@/theme/context"

import { Avatar } from "./Avatar"

const MAX_VISIBLE_AVATARS = 6

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (!parts[0]) return "??"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function hashName(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return Math.abs(hash)
}

export function AvatarRow({ members }: { members: ClubDetail["members"] }) {
  const { theme } = useAppTheme()

  const avatarColours = useMemo(
    () => [
      theme.colors.primary,
      theme.colors.tertiary,
      theme.colors.outline,
      theme.colors.palette.neutral600,
      theme.colors.palette.secondary500,
      theme.colors.palette.neutral700,
    ],
    [theme.colors],
  )

  const visibleMembers = members.slice(0, MAX_VISIBLE_AVATARS)
  const remainingCount = members.length - visibleMembers.length
  const startIndex = visibleMembers.length
    ? hashName(visibleMembers[0].name) % avatarColours.length
    : 0

  return (
    <View className="flex-row mt-3.5 mb-3">
      {visibleMembers.map((member, index) => (
        <Avatar
          key={member.id}
          label={initials(member.name)}
          backgroundColor={avatarColours[(startIndex + index) % avatarColours.length]}
          overlap={index > 0}
          zIndex={MAX_VISIBLE_AVATARS - index}
        />
      ))}

      {remainingCount > 0 ? (
        <Avatar
          label={`+${remainingCount}`}
          backgroundColor={theme.colors.surfaceContainerHigh}
          overlap={visibleMembers.length > 0}
          zIndex={1}
          textClassName="text-on-surface"
        />
      ) : null}
    </View>
  )
}
