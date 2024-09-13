import isNil from 'lodash.isnil';
import Common from '@t2crm/wfm-utils/lib/types/common';
import Base from 'types/base';
import ContactTypes from 'enums/contactsTypes';

const getContacts = (fields: Common.KeyValue): Base.Contacts[] => {
  if (!fields?.['contacts-owners-list']?.length) {
    return [];
  }

  return fields['contacts-owners-list'].reduce((
    accum: Base.Contacts[],
    contactOwner: Common.KeyValue,
  ) => {
    contactOwner['contact-types-list'].forEach((item: Common.KeyValue) => {
      if (isNil(item?.contactType)) {
        return;
      }

      accum.push({
        owner: contactOwner.owner,
        positionId: contactOwner.positionId,
        typeId: item.contactType,
        data: item.contactType === ContactTypes.PhoneNumber && item?.contact?.[0] !== '7'
          ? `7${item.contact}`
          : item.contact,
      });
    });
    return accum;
  }, []);
};

export default getContacts;
