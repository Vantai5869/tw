import React from "react";
import MultiSearchModal from "../../../../componets/MultiSearchModal";
import MultiSelect from "../../../../componets/MultiSelect";

interface Props {
  data: any;
  title: string;
  isShow: boolean;
  value: any;
  setShow: (e: boolean) => void;
  onSelect: (e: string) => void;
  search?: (e: string) => void;
  noSearch?: boolean;
  id?: string;
  name?: string;
}

const Select: React.FC<Props> = ({
  data,
  title,
  isShow,
  value,
  setShow,
  onSelect,
  search,
  noSearch,
  id,
  name,
}) => {
  return (
    <>
      {noSearch ? (
        <MultiSelect
          isVisible={isShow}
          title={title}
          value={id ? id : "id"}
          label={name ? name : "name"}
          data={data}
          checkeds={[value?.id]}
          onClose={() => setShow(false)}
          onChange={(e) => onSelect(e)}
          multi={false}
        ></MultiSelect>
      ) : (
        <MultiSearchModal
          search={search!!}
          isVisible={isShow}
          title={title}
          value={id ? id : "id"}
          label={name ? name : "name"}
          data={data}
          checkeds={[value?.id]}
          onClose={() => setShow(false)}
          onChange={(e) => onSelect(e)}
          multi={false}
        />
      )}
    </>
  );
};
export default Select;
