import { useMemo } from 'react';
import useBreakpoints from '@hooks/useBreakpoints';

interface UseCalculatePlaceholdersProps {
  smCt?: number; // items per row for each breakpoint
  mdCt?: number;
  lgCt?: number;
  xlCt?: number;
  xxlCt?: number;
  itemsLength: number;
}

const useCalculatePlaceholders = ({
  smCt,
  mdCt,
  lgCt,
  xlCt,
  xxlCt,
  itemsLength,
}: UseCalculatePlaceholdersProps) => {
  const { sm, md, lg, xl, xxl } = useBreakpoints();
  const itemsPerRow = useMemo(() => {
    if (xxl && xxlCt) return xxlCt;
    if (xl && xlCt) return xlCt;
    if (lg && lgCt) return lgCt;
    if (md && mdCt) return mdCt;
    if (sm && smCt) return smCt;
    return 0;
  }, [sm, md, lg, xl, xxl, smCt, mdCt, lgCt, xlCt, xxlCt]);

  const totalRows = Math.ceil(18 / itemsPerRow);
  const totalItems = totalRows * itemsPerRow;
  const placeholdersRequired = totalItems - itemsLength;

  return placeholdersRequired;
};

export default useCalculatePlaceholders;
