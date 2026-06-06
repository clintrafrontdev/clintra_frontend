import React from 'react'
import { Bell } from 'lucide-react'
import { Button } from '../common/Button'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Notification } from '../../types/dashboard'
import { cn } from '../../utils/cn'

interface NotificationBellProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ notifications, onMarkAsRead }) => {
  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-secondary/95 backdrop-blur-xl border-white/10">
        <div className="p-4 border-b border-white/10">
          <h3 className="text-white font-semibold">Notifications</h3>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No notifications
            </div>
          ) : (
            notifications.map(notification => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors",
                  !notification.isRead && "bg-primary/5"
                )}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <p className="text-sm text-white font-medium">{notification.title}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}