# UI Components

This directory contains reusable UI components for the application.

## Structure

Each component should be in its own `.tsx` file following TypeScript conventions.

## Recommended Components to Add

Based on common UI component libraries, you can add:

- **Layout Components**: Card, Separator, Aspect Ratio
- **Form Components**: Button, Input, Textarea, Checkbox, Switch, Select, Slider
- **Data Display**: Table, Badge, Avatar, Tooltip
- **Feedback**: Alert, Toast, Dialog, Drawer, Skeleton
- **Navigation**: Breadcrumb, Tabs, Command, Menu
- **Media**: Carousel, Calendar, Chart

## Usage Example

```tsx
import { Button, Card } from '@/components/ui';

export default function MyComponent() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

## TypeScript Support

All components should be written in TypeScript with proper prop types defined.
