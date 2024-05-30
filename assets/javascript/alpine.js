document.addEventListener("alpine:init", () => {
  Alpine.data("menuItems", () => ({
    bestSeller: [
      {
        id: 101,
        name: "Beef Steak Original",
        img: "best_seller/1.png",
        price: 32000,
        desk: "Pilihan Saos: Original / Blackpaper / Barbeque",
      },
      {
        id: 102,
        name: "Udang Saus Pedas",
        img: "best_seller/2.png",
        price: 30000,
        desk: "",
      },
      {
        id: 103,
        name: "Ayam Saus Pedas",
        img: "best_seller/3.png",
        price: 25000,
        desk: "Pilihan Saos: Pedas / Tiram / Mentega",
      },
      {
        id: 104,
        name: "Bakmi Goreng Seafood",
        img: "best_seller/4.png",
        price: 20000,
        desk: "",
      },
      {
        id: 105,
        name: "Capcay Goreng Seafood",
        img: "best_seller/5.jpg",
        price: 20000,
        desk: "",
      },
      {
        id: 106,
        name: "Sop Iga Teman Hati",
        img: "best_seller/6.jpg",
        price: 35000,
        desk: "(include nasi)",
      },
    ],
  }));

  Alpine.store("cart", {
    // itemInCart dan inCart kebalik tp mls ubah :)
    itemInCart: [],
    totalPrice: 0,
    totalQuantity: 0,
    addItem(newItem) {
      // Cek apakah ada barang yang sama di cart
      const inCart = this.itemInCart.find(
        (anyItem) => anyItem.id === newItem.id,
      );

      // Jika belum ada atau Cart masih kosong
      if (!inCart) {
        this.itemInCart.push({
          ...newItem,
          quantity: 1,
          totalItemPrice: newItem.price,
        });

        this.totalQuantity++;

        this.totalPrice += newItem.price;
      } else {
        // Jika sudah ada barang di cart, cek apakah barang yang ditambahkan lagi beda atau sama jenis
        this.itemInCart = this.itemInCart.map((anyItemInCart) => {
          // Jika berbeda jenis
          if (anyItemInCart.id !== newItem.id) {
            // Buat Template Baru
            return anyItemInCart;
          } else {
            // Jika barang sama jenis (sudah ada di cart), tambah quantity barang tsb dan totalnya
            anyItemInCart.quantity++;
            anyItemInCart.totalItemPrice =
              anyItemInCart.price * anyItemInCart.quantity;
            this.totalQuantity++;
            this.totalPrice += anyItemInCart.price;
            return anyItemInCart;
          }
        });
      }
    },
    removeItem(getId) {
      // Ambil Item yang akan di remove berdasarkan id nya
      const matchItem = this.itemInCart.find((anyItem) => anyItem.id === getId);

      // Jika quantity suatu item di cart lebih dari 1
      if (matchItem.quantity > 1) {
        this.itemInCart = this.itemInCart.map((thatItem) => {
          // Jika click minus (removeItem) pada Item yang id nya tidak sesuai
          if (thatItem.id !== getId) {
            return thatItem;
          } else {
            // Jika click minus (removeItem) pada Item yang ID nya sesuai
            thatItem.quantity--;
            thatItem.totalItemPrice = thatItem.price * thatItem.quantity;
            this.totalQuantity--;
            this.totalPrice -= thatItem.price;
            return thatItem;
          }
        });
      } else if (matchItem.quantity === 1) {
        // Jika quantity suatu item di cart sisa 1
        // itemInCart akan menjadi array baru yang berisi semua item kecuali item yang kita click minus (hilang)
        this.itemInCart = this.itemInCart.filter(
          (allItem) => allItem.id !== getId,
        );
        this.totalQuantity--;
        this.totalPrice -= matchItem.price;
      }
    },
  });
});

// Konversi ke Rupiah
const toRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
