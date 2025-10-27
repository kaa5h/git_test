import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { MachineStatus, ProtocolType } from '../../types';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'gray';
  status?: MachineStatus;
  protocol?: ProtocolType;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', status, protocol, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

    const variants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
      gray: 'bg-gray-100 text-gray-600',
    };

    // Status-specific styling
    const statusVariants: Record<MachineStatus, string> = {
      connected: 'bg-green-100 text-green-800',
      disconnected: 'bg-red-100 text-red-800',
      deploying: 'bg-blue-100 text-blue-800 animate-pulse',
      error: 'bg-red-100 text-red-800',
      draft: 'bg-gray-100 text-gray-600',
    };

    // Protocol-specific styling
    const protocolVariants: Record<ProtocolType, string> = {
      opcua: 'bg-purple-100 text-purple-800',
      s7: 'bg-cyan-100 text-cyan-800',
      modbus: 'bg-orange-100 text-orange-800',
      mqtt: 'bg-green-100 text-green-800',
      custom: 'bg-gray-100 text-gray-800',
    };

    let appliedVariant = variants[variant];
    if (status) appliedVariant = statusVariants[status];
    if (protocol) appliedVariant = protocolVariants[protocol];

    return (
      <span
        ref={ref}
        className={cn(baseStyles, appliedVariant, className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
