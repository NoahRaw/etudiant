import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#E4E4E4', padding: 10 },
  section: { margin: 10, padding: 10, flexGrow: 1, border: '1px solid #000' },
  header: { fontSize: 20, marginBottom: 10 },
  table: { display: 'table', width: 'auto', marginTop: 20 },
  tableRow: { flexDirection: 'row' },
  tableCol: { width: '25%', borderStyle: 'solid', borderWidth: 1, borderColor: '#000' },
  tableCell: { margin: 5, fontSize: 10 }
});

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Nombre De Billet Vendu Par Etudiant</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Etudiant</Text>
            </View>
            {data.all_billet && data.all_billet.map((billet, index) => (
              <View style={styles.tableCol} key={index}>
                <Text style={styles.tableCell}>{billet.prix}</Text>
              </View>
            ))}
          </View>
          {data.all_user && data.all_billet && data.all_user.map((user, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{user.nom}</Text>
              </View>
              {data.all_billet.map((billet, index) => (
                <View style={styles.tableCol} key={index}>
                  <Text style={styles.tableCell}>
                    {data.nbr_billet_etudiant[user.nom] ? data.nbr_billet_etudiant[user.nom][billet.prix] : 0}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <Text>Total prix matiere premiere: {data.prix_total_matiere_premiere}</Text>
      </View>
    </Page>
  </Document>
);

const StatistiqueRevenue = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const response = await fetch('http://localhost:2000/utilisateurs/stat_billet_etudiant');
        if (response.ok) {
          const data = await response.json();
          setData(data);
          console.log(data.all_billet);
        } else {
          console.error('Erreur lors de la récupération des commissions:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des commissions:', error);
      }
    };

    fetchCommissions();
  }, []);

  const exportToExcel = () => {
    // Create a new workbook and add a sheet
    const workbook = XLSX.utils.book_new();
    const worksheetData = [
      ['Etudiant', ...data.all_billet.map(billet => billet.prix)],
      ...data.all_user.map(user => [
        user.nom,
        ...data.all_billet.map(billet => data.nbr_billet_etudiant[user.nom]?.[billet.prix] || 0)
      ])
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Statistiques');

    // Export the workbook
    XLSX.writeFile(workbook, 'statistiques_revenue.xlsx');
  };

  return (
    <div>
      <div id="right-panel" className="right-panel">
                    <div className="content">
                            <div className="animated fadeIn">
                                  <div className="col-lg-10">
              <div className="card">
                <div className="card-header">
                  <strong className="card-title">Nombre De Billet Vendu Par Etudiant</strong>
                </div>
                <div className="card-body">
                  <table id="bootstrap-data-table" className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Etudiant</th>
                        {data.all_user && data.all_billet.map((billet, index) => (
                          <th key={index}>{billet.prix}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.all_user && data.all_billet && data.all_user.map((user, index) => (
                        <tr key={index}>
                          <td>{user.nom}</td>
                          {data.all_billet.map((billet, index) => (
                            <td key={index}>
                              {data.nbr_billet_etudiant[user.nom] ? data.nbr_billet_etudiant[user.nom][billet.prix] : 0}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6 mb-4 stretch-card transparent">
                  <div className="card card-tale">
                    <div className="card-body">
                      <p className="mb-4">Total prix matiere premiere</p>
                      <p className="fs-30 mb-2">{data.prix_total_matiere_premiere}</p>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                  <PDFDownloadLink
                    document={<MyDocument data={data} />}
                    fileName="statistiques_revenue.pdf"
                  >
                    {({ loading }) => (loading ? 'Chargement du document...' : 'Télécharger le PDF')}
                  </PDFDownloadLink>
                </div>
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                  <button onClick={exportToExcel}>Exporter en Excel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistiqueRevenue;
