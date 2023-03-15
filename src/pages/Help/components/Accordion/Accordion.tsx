import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { DropdownIcon } from '../../../../assets/icons';


const data = [
  { header: 'Section 1', content: 'Content 1' },
  { header: 'Section 2', content: 'Content 2' },
  { header: 'Section 3', content: 'Content 3' }
];

const Accordion = () => {
  // const [activeSection, setActiveSection] = useState(null);

  // const toggleSection = (index: any) => {
  //   if (activeSection === index) {
  //     setActiveSection(null);
  //   } else {
  //     setActiveSection(index);
  //   }
  // };

  const [activeSection, setActiveSection] = useState(-1);

  const toggleSection = (index:any) => {
    setActiveSection(activeSection === index ? -1 : index);
  };

  return (
    <View>
      {/* {data.map((item, index) => (
        <View key={index} style={{ borderBottomWidth:1, marginBottom:5, paddingLeft:10, width:"100%"}}>
          <TouchableOpacity onPress={() => toggleSection(index)} style={{paddingVertical:15}}>
            <Text>{item.header}</Text>
          </TouchableOpacity>
          {activeSection === index && (
            <Text style={{ marginVertical:30}}>{item.content}</Text>
          )}
        </View>
      ))} */}
       <View style={{ borderBottomWidth:1, borderBottomColor:"gray", marginBottom:5, paddingHorizontal:10, width:"100%"}}>
          <TouchableOpacity onPress={() => toggleSection(0)} style={{paddingVertical:15, flexDirection:"row", justifyContent:"space-between"}}>
            <Text>Yuk Kenalan sama Ella</Text>
            <DropdownIcon/>
          </TouchableOpacity>
          {activeSection === 0 && (
            <View style={{marginVertical:20}}>
            <Text>Mau belanja seafood tapi males pergi? Lagi capek? Tidak mau repot? Ellafroze saja solusinya. Sebagai tempat belanja seafood online, Ellafroze hadir buat membantu kamu ngedapetin seafood kegemaranmu.</Text>
            <Text style={{marginTop:13}}>Berdiri sejak 2020, dikelola dan di operasikan oleh PT Bintang Berkah Melimpah, Ellafroze berkomitmen untuk memberikan kenyamanan dan kepuasan belanja seafood serta pembayaran yang mudah dan aman.</Text>
            <Text style={{marginTop:13}}>Simpel, praktis dan nyaman di kantong. Ellafroze memastikan kualitas seafood kamu pasti higienis, bergizi dan halal.</Text>
            <Text style={{marginTop:13}}>Kami juga memberikan solusi yang praktis dan hemat untuk teman-teman pelaku UMKM yang perlu menggunakan bahan baku berbasis ikan laut seperti bakso, pempek, otak-otak, batagor, tekwan, seafood bakar, seafood goreng, dan lain-lainnya.</Text>
            <Text style={{marginTop:13}}> Btw, semua produk Ellafroze sangat terjaga kualitasnya karena diproses di fasilitas pengolahan ikan milik Ellafroze dan didistribusikan melalui cabang-cabang Ellafroze yang didukung dengan fasilitas penyimpanan cold storage modern.</Text>

            </View>
          )}
        </View>
        <View style={{ borderBottomWidth:1, borderBottomColor:"gray", marginBottom:5, paddingHorizontal:10, width:"100%"}}>
          <TouchableOpacity onPress={() => toggleSection(1)} style={{paddingVertical:15, flexDirection:"row", justifyContent:"space-between"}}>
            <Text>Bagaimana cara melakukan pemesanan di Ella?</Text>
            <DropdownIcon/>
          </TouchableOpacity>
          {activeSection === 1 && (
            <View style={{marginVertical:20}}>
            <Text>1. Teman Ella dapat melakukan pemesanan melalui website ellafroze.com atau via aplikasi android Ella Froze</Text>
            <Text style={{marginTop:13}}>2. Silahkan pilih cabang terdekat dengan lokasi pengiriman produk</Text>
            <Text style={{marginTop:13}}>3. Pilih produk yang ingin dibeli dan tentukan jumlah yang diinginkan, tentunya Ella juga menyediakan harga khusus bila ingin membeli produk dalam jumlah banyak</Text>
            <Text style={{marginTop:13}}>4. Apabila kamu mendapatkan pesan "tidak bisa menghitung biaya kirim ke alamat kamu" berarti daerah kamu belum terjangkau oleh Ella. Silahkan hubungi CS agar Ella dapat memberikan solusi pengiriman buat kamu.</Text>
            <Text style={{marginTop:13}}>5. Silahkan melakukan pembayaran sesuai metode pembayaran yang diinginkan. Pastikan kamu melakukan pembayaran sebelum transaksinya kadaluarsa ya.</Text>

            </View>
          )}
        </View>
        <View style={{ borderBottomWidth:1, borderBottomColor:"gray", marginBottom:5, paddingHorizontal:10, width:"100%"}}>
          <TouchableOpacity onPress={() => toggleSection(2)} style={{paddingVertical:15, flexDirection:"row", justifyContent:"space-between"}}>
            <Text>Kapan pengantaran dilakukan oleh Ella?</Text>
            <DropdownIcon/>
          </TouchableOpacity>
          {activeSection === 2 && (
            <View style={{marginVertical:20}}>
            <Text>Ella selalu berusaha semaksimal mungkin agar produk yang dipesan dapat sampai secepatnya dan tentunya masih fresh. Oleh karenanya produk kamu pasti akan segera kami kirimkan maksimal 2x24 jam.</Text>
            </View>
          )}
        </View>
        <View style={{ borderBottomWidth:1, borderBottomColor:"gray", marginBottom:5, paddingHorizontal:10, width:"100%"}}>
          <TouchableOpacity onPress={() => toggleSection(3)} style={{paddingVertical:15, flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{width:"90%"}}>Bagaimana bila saya ingin membatalkan pesanan saya?</Text>
            <DropdownIcon/>
          </TouchableOpacity>
          {activeSection === 3 && (
            <View style={{marginVertical:20}}>
            <Text>Segera hubungi CS kami melalui fitur pesan dan infokan nomor pesanan apabila Teman Ella ingin membatalkan pesanan. Apabila pesanan belum kami kirimkan, maka pesanan akan kami bantu batalkan dan uang akan kami transfer balik kembali. Namun apabila pesanan sudah keburu di bawa kurir, maka pesanan sudah tidak dapat dibatalkan kembali.</Text>
            </View>
          )}
        </View>
        <View style={{ borderBottomWidth:1, borderBottomColor:"gray", marginBottom:5, paddingHorizontal:10, width:"100%"}}>
          <TouchableOpacity onPress={() => toggleSection(4)} style={{paddingVertical:15, flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{width:"90%"}}>Bagaimana bila barang yang dikirimkan tidak sesuai dengan pesanan saya?</Text>
            <DropdownIcon/>
          </TouchableOpacity>
          {activeSection === 4 && (
            <View style={{marginVertical:20}}>
            <Text>Ella memberikan garansi untuk semua pesanan kamu. Apabila Teman Ella menerima barang yang tidak sesuai pesanan atau barang diterima dalam kondisi tidak fresh, segera hubungi CS kami melalui whatsapp, sampaikan permasalahan yang ada serta lampirkan bukti foto. Kami akan segera mengirimkan kembali pesanan kamu dan ongkos kirim akan Ella tanggung.</Text>
            </View>
          )}
        </View>
        <View style={{ borderBottomWidth:1, borderBottomColor:"gray", marginBottom:5, paddingHorizontal:10, width:"100%"}}>
          <TouchableOpacity onPress={() => toggleSection(5)} style={{paddingVertical:15, flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{width:"90%"}}>Bagaimana cara menyampaikan saran atau keluhan yang saya miliki?</Text>
            <DropdownIcon/>
          </TouchableOpacity>
          {activeSection === 5 && (
            <View style={{marginVertical:20}}>
            <Text>Ella sangat senang bila bisa mendapatkan saran dan keluhan dari Teman Ella untuk perkembangan Ella kedepannya. Silahkan hubungi CS kami melalui fitur pesan dan sampaikan saran dan keluhan kamu.</Text>
            </View>
          )}
        </View>
        <View style={{ borderBottomWidth:1, borderBottomColor:"gray", marginBottom:5, paddingHorizontal:10, width:"100%"}}>
          <TouchableOpacity onPress={() => toggleSection(6)} style={{paddingVertical:15, flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{width:"90%"}}>Bagaimana bila saya lupa password?</Text>
            <DropdownIcon/>
          </TouchableOpacity>
          {activeSection === 6 && (
            <View style={{marginVertical:20}}>
            <Text>Bagi kamu yang login menggunakan google, silahkan mereset password google kamu terlebih dahulu</Text>
            <Text style={{marginTop:13}}>Bagi kamu yang daftar menggunakan email, silahkan klik "Lupa Password" di halaman login</Text>
            <Text style={{marginTop:13}}>Bagi kamu yang daftar menggunakan no telepon dan belum mengisi email, silahkan menghubungi CS untuk di bantu mengubah password</Text>
            </View>
          )}
        </View>
        <View style={{ borderBottomWidth:1, borderBottomColor:"gray", marginBottom:5, paddingHorizontal:10, width:"100%"}}>
          <TouchableOpacity onPress={() => toggleSection(7)} style={{paddingVertical:15, flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{width:"90%"}}>Butuh bantuan lebih lanjut?</Text>
            <DropdownIcon/>
          </TouchableOpacity>
          {activeSection === 7 && (
            <View style={{marginVertical:20}}>
            <Text>Teman Ella dapat menghubungi CS kami di nomor Whatsapp berikut:</Text>
            <Text style={{marginTop:13}}>CS Yogyakarta: 0895-2989-9802</Text>
            <Text style={{marginTop:13}}>CS Jakarta: 0878-7766-2928</Text>
            <Text style={{marginTop:13}}>CS Pekalongan: 0819-3181-4005</Text>
            <Text style={{marginTop:13}}>CS Semarang: 0813-2820-0674</Text>
            <Text style={{marginTop:13}}>CS Cibubur: 0811-1255-707</Text>
            </View>
          )}
        </View>
    </View>
  );
};

export default Accordion;


