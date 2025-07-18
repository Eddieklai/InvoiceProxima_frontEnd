import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Colors } from '@/constants/Colors';
import html2pdf from 'html2pdf.js';

import EditableTitle from '@/components/invoiceEditor/EditableTitle';
// import EditableLogo from '@/components/invoiceEditor/EditableLogo';
import AddressUser from '@/components/invoiceEditor/AdressUser';
import AdressClient from '@/components/invoiceEditor/AdressClient';
import ProductSelector from '@/components/invoiceEditor/ProductSelector';

import { createInvoice } from '@/services/invoiceServices';


import type { Client } from '@/context/ClientsContext';
import InvoiceLayout from '@/components/Layout/InvoiceLayout';

export default function InvoiceEditor() {
  const [title, setTitle] = useState('');
  // const [logo, setLogo] = useState('');
  const [client, setClient] = useState<Client | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<{ product: any, quantity: number }[]>([]);
  const [showProductEditor, setShowProductEditor] = useState(false);

  const totalTTC = selectedProducts.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
  const totalHT = selectedProducts.reduce((sum, { product, quantity }) => sum + (product.price * quantity) / (1 + product.tva / 100), 0);
  const totalTVA = totalTTC - totalHT;

  function handleExportPDF() {
    const element = document.getElementById('invoice-pdf');
    if (!element) return;
    html2pdf()
      .set({
        margin: 0,
        filename: 'facture.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
      })
      .from(element)
      .save();
  }

  async function handleFinishInvoice() {
    if (!title || !client || selectedProducts.length === 0) {
      alert('Veuillez remplir tous les champs avant de finaliser la facture.');
      return;
    }
    const element = document.getElementById('invoice-pdf');
    if (!element) return;

    try {
    const pdfBlob = await html2pdf().set({
        margin: 0,
        filename: title ? `${title}.pdf` : 'facture.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
      }).from(element).outputPdf('blob');
          const invoice = await createInvoice(title, client.id, totalTTC, totalHT, selectedProducts, pdfBlob);
          console.log('Facture créée avec succès:', invoice);
          alert('Facture créée avec succès !');
        } catch (error) {
          console.error('Erreur lors de la création de la facture:', error);
          alert('Une erreur est survenue lors de la création de la facture.');
        }
      }

  function handleShowEditor() {
          setTimeout(() => {
            setShowProductEditor(true);
          }, 500); // durée de l'animation
        }

  function handleShowFacture() {
          setTimeout(() => {
            setShowProductEditor(false);
          }, 500);
        }



  useEffect(() => {
          console.log('InvoiceEditor selectedProducts', selectedProducts);
        }, [selectedProducts]);

    return (
      <Wrapper>
        {showProductEditor ? (
          <FadeInDiv>
            <ProductSelector
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              onConfirm={handleShowFacture}
            />
          </FadeInDiv>
        ) : (
          <>
            <A4 id="invoice-pdf">
              <WrapperLogoTitle>
                <div />
                <EditableTitle value={title} onChange={setTitle} />
              </WrapperLogoTitle>
              <Adresses>
                <div style={{ flex: 1, padding: 16 }}>
                  <AddressUser />
                </div>
                <div style={{ flex: 1, padding: 16 }}>
                  <AdressClient client={client ?? undefined} onChange={setClient} />
                </div>
              </Adresses>
              <TableSection >
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <Th>Désignation</Th>
                      <Th>Quantité</Th>
                      <Th>Prix Unitaire</Th>
                      <Th>Tva</Th>
                      <Th>Montant HT</Th>
                      <Th>Total TTC</Th>
                    </tr>
                  </thead>
                  <TBody onClick={handleShowEditor}>
                    {selectedProducts.length === 0 ? (
                      <tr>
                        <Td colSpan={6} style={{ textAlign: 'center', padding: '32px 0', color: Colors.mediumGray }}>
                          Aucun produit sélectionné, cliquez ici pour en ajouter
                        </Td>
                      </tr>
                    ) : (


                      selectedProducts.map(({ product, quantity }) => (
                        <tr key={product.id}>
                          <Td>{product.name}</Td>
                          <Td>{quantity}</Td>
                          <Td>{product.price}€</Td>
                          <Td>{product.tva}%</Td>
                          <Td>{((product.price * quantity) / (1 + product.tva / 100)).toFixed(2)}€</Td>
                          <Td>{((product.price * quantity)).toFixed(2)}€</Td>
                        </tr>
                      ))

                    )}
                  </TBody>
                </table>
              </TableSection>
              <Total>
                <TotalBox>
                  <div>
                    <TotalLabel>Total HT</TotalLabel>
                    <TotalValue>{totalHT.toFixed(2)} €</TotalValue>
                  </div>
                  <div>
                    <TotalLabel>TVA payée</TotalLabel>
                    <TotalValue>{totalTVA.toFixed(2)} €</TotalValue>
                  </div>
                  <div>
                    <TotalLabel>Total TTC</TotalLabel>
                    <TotalValue>{totalTTC.toFixed(2)} €</TotalValue>
                  </div>
                </TotalBox>
              </Total>
            </A4>
            {InvoiceLayout(handleExportPDF, handleFinishInvoice)}
          </>
        )}
      </Wrapper>
    );
  }

  const Wrapper = styled.div`
  min-height: 100vh;
  background: ${Colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
`;

  const A4 = styled.div`
  width: 794px;
  height: 1123px;
  background: ${Colors.white};
  border-radius: 12px;
  box-shadow: 0 8px 32px ${Colors.shadowStrong};
  border: 1.5px solid ${Colors.mediumGray};
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

  const WrapperLogoTitle = styled.section`
  width: 100%;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

  const Adresses = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 16px;
`;

  const TableSection = styled.section`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 16px;
  overflow: hidden;
`;

  const TBody = styled.tbody`
  &:hover tr,
  &:hover td {
    background: ${Colors.lightGray};
    transform: scale(1.01);
    transition: background 1s, transform 0.4s;
    cursor: pointer;
  }
`;

  const Th = styled.th`
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid ${Colors.mediumGray};
`;

  const Td = styled.td`
  padding: 10px 8px;
  font-size: 15px;
  color: #222;
  border-bottom: 1px solid #ececec;
  text-align: center;
  transition: background 0.2s;
`;

  const Total = styled.section`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  border-top: 1px solid ${Colors.mediumGray};
`;

  const TotalBox = styled.div`
  width: 320px;
  background: #f5f5f7;
  border-radius: 10px;
  box-shadow: 0 2px 8px #0001;
  padding: 18px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  margin-top: 8px;
`;

  const TotalLabel = styled.span`
  font-size: 15px;
  color: ${Colors.mediumGray};
  font-weight: 500;
`;

  const TotalValue = styled.span`
  font-size: 18px;
  color: ${Colors.primary};
  font-weight: 700;
`;

  const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px);}
  to { opacity: 1; transform: translateY(0);}
`;

  const FadeInDiv = styled.div`
  animation: ${fadeIn} 0.35s;
`;

//   const fadeOut = keyframes`
//   from { opacity: 1; transform: translateY(0);}
//   to { opacity: 0; transform: translateY(10px);}
// `;

//   const FadeOutDiv = styled.div`
//   animation: ${fadeOut} 0.35s;
// `;