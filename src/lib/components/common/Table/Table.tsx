import React from 'react';
import {
  DataGridPremium,
  DataGridPremiumProps,
  GridColDef,
  useGridApiRef as muiUseGridApiRef,
  useGridApiContext as muiUseGridApiContext,
  useGridSelector as muiUseGridSelector,
} from '@mui/x-data-grid-premium';
import { LicenseInfo } from '@mui/x-license';
import { forwardRef } from 'react';
import { MUI_X_PREMIUM_LICENSE_KEY } from './const';

LicenseInfo.setLicenseKey(MUI_X_PREMIUM_LICENSE_KEY);
export type TableProps = DataGridPremiumProps;
export type TableColumn = GridColDef;

export const useGridApiRef = muiUseGridApiRef;
export const useGridApiContext = muiUseGridApiContext;
export const useGridSelector = muiUseGridSelector;

const Table = forwardRef<HTMLDivElement, TableProps>((props, ref) => {
  const { apiRef: _apiRef, ...restProps } = props;
  const gridApiRef = useGridApiRef();
  const apiRef = _apiRef ?? gridApiRef;
  return <DataGridPremium apiRef={apiRef} ref={ref} {...restProps} />;
});

export default Table;
