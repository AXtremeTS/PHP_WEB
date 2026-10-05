<?php

namespace App\Support;

class ProductCatalog
{
    public static function all(): array
    {
        return [
            [
                'id' => 1, 'slug' => 'asus-dual-rtx-4070-super', 'name' => 'GeForce RTX 4070 SUPER 12GB',
                'category' => 'Card đồ họa', 'categorySlug' => 'card-do-hoa', 'brand' => 'ASUS DUAL',
                'price' => 16990000, 'oldPrice' => 18990000, 'rating' => '4.9', 'reviews' => 128,
                'label' => 'BÁN CHẠY', 'image' => 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=85', 'color' => 'lavender',
                'stock' => 8, 'description' => 'Nâng tầm trải nghiệm gaming và sáng tạo với kiến trúc NVIDIA Ada Lovelace, DLSS 3 và khả năng ray tracing thế hệ mới.',
                'specs' => ['Bộ nhớ' => '12GB GDDR6X', 'Giao tiếp' => 'PCI Express 4.0', 'Nguồn đề xuất' => '750W', 'Bảo hành' => '36 tháng'],
            ],
            [
                'id' => 2, 'slug' => 'amd-ryzen-7-7800x3d', 'name' => 'AMD Ryzen 7 7800X3D',
                'category' => 'Bộ vi xử lý', 'categorySlug' => 'bo-vi-xu-ly', 'brand' => 'AMD',
                'price' => 9990000, 'oldPrice' => 10990000, 'rating' => '5.0', 'reviews' => 96,
                'label' => 'GIÁ TỐT', 'image' => 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=800&q=85', 'color' => 'peach',
                'stock' => 12, 'description' => 'Bộ vi xử lý gaming hàng đầu với công nghệ AMD 3D V-Cache, tối ưu FPS và khả năng phản hồi trong những tựa game nặng.',
                'specs' => ['Nhân / luồng' => '8 / 16', 'Xung tối đa' => '5.0 GHz', 'Socket' => 'AM5', 'Bảo hành' => '36 tháng'],
            ],
            [
                'id' => 3, 'slug' => 'corsair-vengeance-rgb-ddr5-32gb', 'name' => 'Vengeance RGB DDR5 32GB',
                'category' => 'RAM', 'categorySlug' => 'ram', 'brand' => 'CORSAIR',
                'price' => 2890000, 'oldPrice' => null, 'rating' => '4.8', 'reviews' => 214,
                'label' => null, 'image' => 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=85', 'color' => 'mint',
                'stock' => 21, 'description' => 'Bộ nhớ DDR5 tốc độ cao với dải đèn RGB sống động và cấu hình Intel XMP 3.0 dễ dàng tinh chỉnh.',
                'specs' => ['Dung lượng' => '32GB (2 x 16GB)', 'Tốc độ' => 'DDR5 6000MHz', 'Độ trễ' => 'CL36', 'Bảo hành' => 'Chính hãng'],
            ],
            [
                'id' => 4, 'slug' => 'samsung-990-pro-nvme-1tb', 'name' => '990 PRO NVMe M.2 1TB',
                'category' => 'Ổ cứng', 'categorySlug' => 'o-cung', 'brand' => 'SAMSUNG',
                'price' => 3190000, 'oldPrice' => 3690000, 'rating' => '4.9', 'reviews' => 76,
                'label' => '−14%', 'image' => 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=85', 'color' => 'blue',
                'stock' => 16, 'description' => 'SSD NVMe PCIe 4.0 siêu tốc, khởi động ứng dụng nhanh và truyền tải tệp dung lượng lớn trong tích tắc.',
                'specs' => ['Dung lượng' => '1TB', 'Giao tiếp' => 'NVMe PCIe 4.0 x4', 'Đọc tuần tự' => '7.450 MB/s', 'Bảo hành' => '60 tháng'],
            ],
            [
                'id' => 5, 'slug' => 'gigabyte-rtx-4060-ti-eagle', 'name' => 'GeForce RTX 4060 Ti 8GB',
                'category' => 'Card đồ họa', 'categorySlug' => 'card-do-hoa', 'brand' => 'GIGABYTE EAGLE',
                'price' => 10990000, 'oldPrice' => null, 'rating' => '4.8', 'reviews' => 68,
                'label' => null, 'image' => 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=85', 'color' => 'blue',
                'stock' => 6, 'description' => 'Card đồ họa nhỏ gọn, mạnh mẽ cho gaming Full HD và sáng tạo nội dung với DLSS 3.',
                'specs' => ['Bộ nhớ' => '8GB GDDR6', 'Giao tiếp' => 'PCI Express 4.0', 'Nguồn đề xuất' => '650W', 'Bảo hành' => '36 tháng'],
            ],
            [
                'id' => 6, 'slug' => 'intel-core-i5-14600kf', 'name' => 'Core i5-14600KF',
                'category' => 'Bộ vi xử lý', 'categorySlug' => 'bo-vi-xu-ly', 'brand' => 'INTEL',
                'price' => 7490000, 'oldPrice' => 8190000, 'rating' => '4.9', 'reviews' => 43,
                'label' => null, 'image' => 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=85', 'color' => 'mint',
                'stock' => 10, 'description' => 'CPU Intel Core thế hệ 14 với hiệu năng đa nhiệm mạnh mẽ, phù hợp cho gaming và làm việc chuyên nghiệp.',
                'specs' => ['Nhân / luồng' => '14 (6P+8E) / 20', 'Xung tối đa' => '5.3 GHz', 'Socket' => 'LGA1700', 'Bảo hành' => '36 tháng'],
            ],
            [
                'id' => 7, 'slug' => 'samsung-odyssey-g5-qhd-165hz', 'name' => 'Odyssey G5 27" QHD 165Hz',
                'category' => 'Màn hình', 'categorySlug' => 'man-hinh', 'brand' => 'SAMSUNG',
                'price' => 5990000, 'oldPrice' => null, 'rating' => '4.7', 'reviews' => 52,
                'label' => 'MỚI', 'image' => 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=85', 'color' => 'lavender',
                'stock' => 5, 'description' => 'Màn hình QHD 27 inch sắc nét với tần số quét 165Hz, đưa bạn vào thế giới game mượt mà và sống động.',
                'specs' => ['Kích thước' => '27 inch', 'Độ phân giải' => '2560 x 1440 (QHD)', 'Tần số quét' => '165Hz', 'Bảo hành' => '24 tháng'],
            ],
            [
                'id' => 8, 'slug' => 'samsung-990-evo-plus-2tb', 'name' => '990 EVO Plus NVMe 2TB',
                'category' => 'Ổ cứng', 'categorySlug' => 'o-cung', 'brand' => 'SAMSUNG',
                'price' => 5490000, 'oldPrice' => null, 'rating' => '4.8', 'reviews' => 31,
                'label' => null, 'image' => 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=85', 'color' => 'peach',
                'stock' => 9, 'description' => 'Không gian lưu trữ 2TB rộng rãi cho thư viện game, dự án sáng tạo và dữ liệu quan trọng.',
                'specs' => ['Dung lượng' => '2TB', 'Giao tiếp' => 'NVMe PCIe 4.0', 'Đọc tuần tự' => '7.250 MB/s', 'Bảo hành' => '60 tháng'],
            ],
            [
                'id' => 9, 'slug' => 'msi-mag-b650-tomahawk-wifi', 'name' => 'MAG B650 TOMAHAWK WIFI',
                'category' => 'Bo mạch chủ', 'categorySlug' => 'bo-mach-chu', 'brand' => 'MSI',
                'price' => 5490000, 'oldPrice' => null, 'rating' => '4.8', 'reviews' => 39,
                'label' => null, 'image' => 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=85', 'color' => 'blue',
                'stock' => 7, 'description' => 'Bo mạch chủ nền tảng AM5 với kết nối Wi-Fi tích hợp, nguồn cấp ổn định và khả năng nâng cấp linh hoạt.',
                'specs' => ['Socket' => 'AM5', 'Chipset' => 'AMD B650', 'Kích thước' => 'ATX', 'Bảo hành' => '36 tháng'],
            ],
            [
                'id' => 10, 'slug' => 'corsair-rm750e-750w', 'name' => 'RM750e 750W 80 Plus Gold',
                'category' => 'Nguồn máy tính', 'categorySlug' => 'nguon-may-tinh', 'brand' => 'CORSAIR',
                'price' => 2690000, 'oldPrice' => null, 'rating' => '4.8', 'reviews' => 25,
                'label' => null, 'image' => 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=85', 'color' => 'mint',
                'stock' => 11, 'description' => 'Bộ nguồn hiệu suất cao, vận hành êm ái với chứng nhận 80 Plus Gold và dây cáp dạng module.',
                'specs' => ['Công suất' => '750W', 'Chứng nhận' => '80 Plus Gold', 'Chuẩn' => 'ATX 3.0', 'Bảo hành' => '84 tháng'],
            ],
            [
                'id' => 11, 'slug' => 'nzxt-h5-flow-black', 'name' => 'H5 Flow Mid-Tower Black',
                'category' => 'Vỏ case', 'categorySlug' => 'vo-case', 'brand' => 'NZXT',
                'price' => 2390000, 'oldPrice' => null, 'rating' => '4.7', 'reviews' => 18,
                'label' => null, 'image' => 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=85', 'color' => 'lavender',
                'stock' => 4, 'description' => 'Thùng máy mid-tower hiện đại với mặt lưới tối ưu luồng gió và không gian rộng cho linh kiện hiệu năng cao.',
                'specs' => ['Kích thước' => 'Mid-Tower', 'Mainboard hỗ trợ' => 'ATX / Micro-ATX / Mini-ITX', 'Mặt trước' => 'Lưới thông gió', 'Bảo hành' => '24 tháng'],
            ],
            [
                'id' => 12, 'slug' => 'deepcool-ak620-digital', 'name' => 'AK620 DIGITAL Black',
                'category' => 'Tản nhiệt CPU', 'categorySlug' => 'tan-nhiet-cpu', 'brand' => 'DEEPCOOL',
                'price' => 1890000, 'oldPrice' => null, 'rating' => '4.8', 'reviews' => 21,
                'label' => null, 'image' => 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=85', 'color' => 'peach',
                'stock' => 8, 'description' => 'Tản nhiệt khí tháp kép hiệu năng cao với màn hình hiển thị nhiệt độ, giữ CPU mát mẻ khi chơi game và làm việc.',
                'specs' => ['Loại tản nhiệt' => 'Khí, tháp kép', 'Quạt' => '2 x 120mm', 'Socket' => 'Intel / AMD', 'Bảo hành' => '24 tháng'],
            ],
        ];
    }

    public static function categories(): array
    {
        return [
            ['name' => 'Card đồ họa', 'slug' => 'card-do-hoa'],
            ['name' => 'Bộ vi xử lý', 'slug' => 'bo-vi-xu-ly'],
            ['name' => 'RAM', 'slug' => 'ram'],
            ['name' => 'Ổ cứng', 'slug' => 'o-cung'],
            ['name' => 'Màn hình', 'slug' => 'man-hinh'],
            ['name' => 'Bo mạch chủ', 'slug' => 'bo-mach-chu'],
            ['name' => 'Tản nhiệt CPU', 'slug' => 'tan-nhiet-cpu'],
            ['name' => 'Nguồn máy tính', 'slug' => 'nguon-may-tinh'],
            ['name' => 'Vỏ case', 'slug' => 'vo-case'],
        ];
    }
}
