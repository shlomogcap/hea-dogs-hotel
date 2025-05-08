import { Box, Stack, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

type FormSectionProps = {
  title?: string;
};
const FormSection = ({
  title,
  children,
}: PropsWithChildren<FormSectionProps>) => {
  return (
    <Box
      borderRadius={2}
      bgcolor={'white'}
      width={320}
      paddingBlock={3}
      paddingInline={4}
    >
      <Stack rowGap={1} justifyContent={'center'} alignItems={'center'}>
        {title && (
          <Typography variant='h6' color={'primary'} mb={1}>
            {title}
          </Typography>
        )}
        {children}
      </Stack>
    </Box>
  );
};

export default FormSection;
