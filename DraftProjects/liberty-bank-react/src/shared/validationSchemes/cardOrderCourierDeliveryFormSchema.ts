import { object, string } from 'yup';
import {
  cardDeliveryBuilding,
  cardDeliveryCity,
  cardDeliveryDate,
  cardDeliveryStreet,
  cardDeliveryTime,
} from '.';

export const cardOrderCourierDeliveryFormSchema = object().shape({
  deliveryCity: cardDeliveryCity,
  deliveryStreet: cardDeliveryStreet,
  deliveryBuilding: cardDeliveryBuilding,
  deliveryDate: cardDeliveryDate,
  deliveryTime: cardDeliveryTime,
  deliveryApartment: string(),
  deliveryFloor: string(),
  deliveryEntrance: string(),
});
