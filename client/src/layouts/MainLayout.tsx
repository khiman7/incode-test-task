import { Box, Typography } from '@mui/joy';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="wrapper">
      <Box component="header" sx={{ py: 3, px: 6 }}>
        <Typography level="h3" fontWeight="bold">
          🗃️ Incode Test Task
        </Typography>
      </Box>
      <main className="page">{children}</main>
    </div>
  );
}
