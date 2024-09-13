import { useLocation } from 'react-router-dom';
import { ICatalogInfo, Preloader, useGetStrapiInsuranceProductQuery } from '@/shared';
import { BodyBlock } from '@/shared/ui/bodyBlock/BodyBlock';
import { InsuranceActionWidget } from '@/widgets/insuranceActionWidget/InsuranceActionWidget';
import { InsuranceConditions } from '@/widgets/insuranceConditions/InsuranceConditions';
import { InsuranceHeader } from '@/widgets/insuranceHeader/InsuranceHeader';
import {
  ButtonType,
  CALC_TEXT,
  DATA_BODY,
  DATA_TITLE,
  DOCUMENT_TITLE,
  InsuranceType,
  PRODUCT_INFO,
  RISKS,
} from './constants';
import { InsuranceNeededDocument } from '@/widgets/insuranceNeededDocuments/InsuranceNeededDocuments.tsx';
import documentImage from '@/shared/ui/icon/assets/images/pen-putting-blue-ticks-paper.png';
import { InsuranceDmsTariffs } from '@/widgets/insuranceDmsTariffs/insuranceDmsTariffs.tsx';
import { InsuranceRisks } from '@/widgets/insuranceRisks/insuranceRisks.tsx';

const ProductPage = () => {
  const location = useLocation();
  const { isLoading, isError, isSuccess, data } = useGetStrapiInsuranceProductQuery(
    location.state.id,
  );

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      {isError && 'Что-то пошло не так'}
      {isSuccess && (
        <>
          <InsuranceHeader
            backBtn={PRODUCT_INFO[location.state.name as InsuranceType].backBtn as string}
            headerInfo={{
              title: data.productName,
              subtitle: data.productDescription,
              calcBtnText: CALC_TEXT,
            }}
            headerImage={PRODUCT_INFO[location.state.name as InsuranceType].productImage as string}
            headerImageSticked
            pathToCalculate={location.state.pathCalculation}
            formHeading={location.state.name}
            style={location.state.style}
          />
          <BodyBlock>
            <InsuranceConditions
              conditions={data.catalogInfo.map((tooltip: ICatalogInfo, i) => ({
                title: tooltip.tooltip_name,
                description: tooltip.description,
                fixedTooltip: tooltip.fixedTooltip,
                tooltipPosition: tooltip.tooltipPosition,
                details:
                  tooltip.tooltip.length > 0
                    ? {
                        content: tooltip.tooltip.map((item) => ({
                          title: item.name,
                          description: item.descriptionInside,
                        })),
                        costCalc: tooltip.costCalc,
                      }
                    : undefined,
                icon: PRODUCT_INFO[location.state.name as InsuranceType].icon[i] as string,
              }))}
            />
            {!location.state.name.includes('медицинское страхование') && (
              <InsuranceNeededDocument
                neededDocuments={{
                  title: DOCUMENT_TITLE,
                  documents: data.requiredDocuments,
                }}
                documentImage={documentImage}
              />
            )}
            {location.state.name.includes('медицинское страхование') && (
              <InsuranceDmsTariffs tariffsHeader={DATA_TITLE} tariffsBody={DATA_BODY} />
            )}
            {(location.state.name.includes('Страхование дома') ||
              location.state.name.includes('Страхование квартиры')) && (
              <InsuranceRisks risks={RISKS} />
            )}
            <InsuranceActionWidget
              actionButtons={
                PRODUCT_INFO[location.state.name as InsuranceType].buttons as ButtonType[]
              }
              actionTitle={PRODUCT_INFO[location.state.name as InsuranceType].actionTitle as string}
              productId={location.state.id}
              style={location.state.style}
            />
          </BodyBlock>
        </>
      )}
    </>
  );
};

export default ProductPage;
