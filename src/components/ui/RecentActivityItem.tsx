import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { RecentActivity } from '../../types/dashboard'
import { formatDistanceToNow } from 'date-fns'

interface RecentActivityItemProps {
  activity: RecentActivity
}

export const RecentActivityItem: React.FC<RecentActivityItemProps> = ({ activity }) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors duration-200">
      <Avatar className="w-10 h-10">
        <AvatarImage src={activity.avatar} alt={activity.user} />
        <AvatarFallback className="bg-primary/20 text-primary">
          {activity.user.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white">
          <span className="font-semibold">{activity.user}</span>
          <span className="text-gray-400"> {activity.action} </span>
          <span className="text-primary">{activity.module}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
        </p>
      </div>
    </div>
  )
}