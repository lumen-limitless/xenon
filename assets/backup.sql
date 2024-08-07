PGDMP      ;                |           verceldb    15.7    16.3 o    �
           0    0    ENCODING    ENCODING        SET client_encoding = 'BIG5';
                      false            �
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �
           1262    16386    verceldb    DATABASE     j   CREATE DATABASE verceldb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE verceldb;
                default    false            �
           0    0    DATABASE verceldb    ACL     2   GRANT ALL ON DATABASE verceldb TO neon_superuser;
                   default    false    2780                        2615    163847    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                default    false            �
           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   default    false    5            Z           1247    163849    OrderStatus    TYPE     m   CREATE TYPE public."OrderStatus" AS ENUM (
    'CANCELLED',
    'COMPLETED',
    'SHIPPED',
    'PENDING'
);
     DROP TYPE public."OrderStatus";
       public          default    false    5            ]           1247    163858    ProductStatus    TYPE     ]   CREATE TYPE public."ProductStatus" AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED'
);
 "   DROP TYPE public."ProductStatus";
       public          default    false    5            `           1247    163866    ReturnStatus    TYPE     ]   CREATE TYPE public."ReturnStatus" AS ENUM (
    'REFUNDED',
    'RECEIVED',
    'PENDING'
);
 !   DROP TYPE public."ReturnStatus";
       public          default    false    5            c           1247    163874    Role    TYPE     R   CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN',
    'SUPER_ADMIN'
);
    DROP TYPE public."Role";
       public          default    false    5            �            1259    163879    account    TABLE     -  CREATE TABLE public.account (
    user_id uuid NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);
    DROP TABLE public.account;
       public         heap    default    false    5            �            1259    163886    address    TABLE     �  CREATE TABLE public.address (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    city character varying(50),
    country character varying(50),
    email text,
    name text,
    state text,
    zip character varying(50),
    phone character varying(50),
    address1 text,
    address2 text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.address;
       public         heap    default    false    5            �            1259    163896 	   attribute    TABLE     }   CREATE TABLE public.attribute (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    attribute_name character varying(255)
);
    DROP TABLE public.attribute;
       public         heap    default    false    5            �            1259    163902    attribute_value    TABLE     �   CREATE TABLE public.attribute_value (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    attribute_id uuid,
    value character varying(255)
);
 #   DROP TABLE public.attribute_value;
       public         heap    default    false    5            �            1259    163916    cart    TABLE     �   CREATE TABLE public.cart (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.cart;
       public         heap    default    false    5            �            1259    163908 	   cart_item    TABLE     a  CREATE TABLE public.cart_item (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    quantity integer NOT NULL,
    product_id uuid NOT NULL,
    variant_id uuid,
    cart_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    price integer NOT NULL
);
    DROP TABLE public.cart_item;
       public         heap    default    false    5            �            1259    163924    category    TABLE     Z  CREATE TABLE public.category (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    icon text,
    image text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    slug text NOT NULL,
    parent_category_id uuid
);
    DROP TABLE public.category;
       public         heap    default    false    5            �            1259    163934    coupons    TABLE     �  CREATE TABLE public.coupons (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    code character varying(50),
    description text,
    discount_value numeric,
    discount_type character varying(50),
    times_used integer,
    max_usage integer,
    coupon_start_date timestamp without time zone,
    coupon_end_date timestamp without time zone,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone,
    created_by uuid,
    updated_by uuid
);
    DROP TABLE public.coupons;
       public         heap    default    false    5            �            1259    180224    notification    TABLE     7  CREATE TABLE public.notification (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    message text NOT NULL,
    read timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);
     DROP TABLE public.notification;
       public         heap    default    false    5            �            1259    163951    order    TABLE     �  CREATE TABLE public."order" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    status public."OrderStatus" DEFAULT 'PENDING'::public."OrderStatus" NOT NULL,
    total integer NOT NULL,
    user_id uuid,
    city text,
    country text,
    email text,
    name text,
    state text,
    zip text,
    phone text,
    address1 text,
    address2 text,
    metadata jsonb,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public."order";
       public         heap    default    false    858    858    5            �            1259    163943 
   order_item    TABLE     c  CREATE TABLE public.order_item (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    quantity integer NOT NULL,
    product_id uuid NOT NULL,
    order_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    price integer NOT NULL,
    variant_id uuid
);
    DROP TABLE public.order_item;
       public         heap    default    false    5            �            1259    163962    product    TABLE     �  CREATE TABLE public.product (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    sku character varying(255) NOT NULL,
    slug text NOT NULL,
    short_description character varying(255),
    product_description text,
    regular_price integer NOT NULL,
    sale_price integer,
    stock integer DEFAULT 0,
    weight integer DEFAULT 0,
    note text,
    status public."ProductStatus" DEFAULT 'DRAFT'::public."ProductStatus" NOT NULL,
    images text[],
    metadata jsonb,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by uuid,
    updated_by uuid
);
    DROP TABLE public.product;
       public         heap    default    false    861    5    861            �            1259    163975    product_to_attribute    TABLE     k   CREATE TABLE public.product_to_attribute (
    product_id uuid NOT NULL,
    attribute_id uuid NOT NULL
);
 (   DROP TABLE public.product_to_attribute;
       public         heap    default    false    5            �            1259    163980    product_to_category    TABLE     i   CREATE TABLE public.product_to_category (
    product_id uuid NOT NULL,
    category_id uuid NOT NULL
);
 '   DROP TABLE public.product_to_category;
       public         heap    default    false    5            �            1259    163993    return    TABLE     `  CREATE TABLE public.return (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    order_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id uuid NOT NULL,
    status public."ReturnStatus" DEFAULT 'PENDING'::public."ReturnStatus" NOT NULL
);
    DROP TABLE public.return;
       public         heap    default    false    864    864    5            �            1259    163985 
   returnItem    TABLE     0  CREATE TABLE public."returnItem" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "returnId" uuid,
    order_item_id uuid NOT NULL
);
     DROP TABLE public."returnItem";
       public         heap    default    false    5            �            1259    164002    review    TABLE     \  CREATE TABLE public.review (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    rating integer NOT NULL,
    title text NOT NULL,
    body text NOT NULL,
    product_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.review;
       public         heap    default    false    5            �            1259    164012    session    TABLE     �   CREATE TABLE public.session (
    "sessionToken" text NOT NULL,
    user_id uuid NOT NULL,
    expires timestamp without time zone NOT NULL
);
    DROP TABLE public.session;
       public         heap    default    false    5            �            1259    164019    user    TABLE     3  CREATE TABLE public."user" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    name text,
    email text NOT NULL,
    "emailVerified" timestamp without time zone,
    image text,
    last_seen_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public."user";
       public         heap    default    false    867    867    5            �            1259    164029    variant    TABLE     �   CREATE TABLE public.variant (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    product_id uuid,
    variant_attribute_value_id uuid,
    sku character varying(255),
    stock integer
);
    DROP TABLE public.variant;
       public         heap    default    false    5            �            1259    164037    variant_value    TABLE     �   CREATE TABLE public.variant_value (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    variant_id uuid,
    attribute_value_id uuid
);
 !   DROP TABLE public.variant_value;
       public         heap    default    false    5            �            1259    164043    verificationToken    TABLE     �   CREATE TABLE public."verificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp without time zone NOT NULL
);
 '   DROP TABLE public."verificationToken";
       public         heap    default    false    5            �
          0    163879    account 
   TABLE DATA           �   COPY public.account (user_id, type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
    public          default    false    214   r�       �
          0    163886    address 
   TABLE DATA           �   COPY public.address (id, user_id, city, country, email, name, state, zip, phone, address1, address2, created_at, updated_at) FROM stdin;
    public          default    false    215   Ԟ       �
          0    163896 	   attribute 
   TABLE DATA           7   COPY public.attribute (id, attribute_name) FROM stdin;
    public          default    false    216   �       �
          0    163902    attribute_value 
   TABLE DATA           B   COPY public.attribute_value (id, attribute_id, value) FROM stdin;
    public          default    false    217   X�       �
          0    163916    cart 
   TABLE DATA           C   COPY public.cart (id, user_id, created_at, updated_at) FROM stdin;
    public          default    false    219   �       �
          0    163908 	   cart_item 
   TABLE DATA           q   COPY public.cart_item (id, quantity, product_id, variant_id, cart_id, created_at, updated_at, price) FROM stdin;
    public          default    false    218   �       �
          0    163924    category 
   TABLE DATA           y   COPY public.category (id, title, description, icon, image, created_at, updated_at, slug, parent_category_id) FROM stdin;
    public          default    false    220   #�       �
          0    163934    coupons 
   TABLE DATA           �   COPY public.coupons (id, code, description, discount_value, discount_type, times_used, max_usage, coupon_start_date, coupon_end_date, created_at, updated_at, created_by, updated_by) FROM stdin;
    public          default    false    221   @�       �
          0    180224    notification 
   TABLE DATA           Z   COPY public.notification (id, user_id, message, read, created_at, updated_at) FROM stdin;
    public          default    false    235   ]�       �
          0    163951    order 
   TABLE DATA           �   COPY public."order" (id, status, total, user_id, city, country, email, name, state, zip, phone, address1, address2, metadata, created_at, updated_at) FROM stdin;
    public          default    false    223   z�       �
          0    163943 
   order_item 
   TABLE DATA           s   COPY public.order_item (id, quantity, product_id, order_id, created_at, updated_at, price, variant_id) FROM stdin;
    public          default    false    222   ��       �
          0    163962    product 
   TABLE DATA           �   COPY public.product (id, title, sku, slug, short_description, product_description, regular_price, sale_price, stock, weight, note, status, images, metadata, created_at, updated_at, created_by, updated_by) FROM stdin;
    public          default    false    224   ��       �
          0    163975    product_to_attribute 
   TABLE DATA           H   COPY public.product_to_attribute (product_id, attribute_id) FROM stdin;
    public          default    false    225   8�       �
          0    163980    product_to_category 
   TABLE DATA           F   COPY public.product_to_category (product_id, category_id) FROM stdin;
    public          default    false    226   ��       �
          0    163993    return 
   TABLE DATA           W   COPY public.return (id, order_id, created_at, updated_at, user_id, status) FROM stdin;
    public          default    false    228   ��       �
          0    163985 
   returnItem 
   TABLE DATA           g   COPY public."returnItem" (id, quantity, created_at, updated_at, "returnId", order_item_id) FROM stdin;
    public          default    false    227   ��       �
          0    164002    review 
   TABLE DATA           f   COPY public.review (id, rating, title, body, product_id, user_id, created_at, updated_at) FROM stdin;
    public          default    false    229   �       �
          0    164012    session 
   TABLE DATA           C   COPY public.session ("sessionToken", user_id, expires) FROM stdin;
    public          default    false    230   �       �
          0    164019    user 
   TABLE DATA           ]   COPY public."user" (id, role, name, email, "emailVerified", image, last_seen_at) FROM stdin;
    public          default    false    231   ��       �
          0    164029    variant 
   TABLE DATA           Y   COPY public.variant (id, product_id, variant_attribute_value_id, sku, stock) FROM stdin;
    public          default    false    232   ��       �
          0    164037    variant_value 
   TABLE DATA           K   COPY public.variant_value (id, variant_id, attribute_value_id) FROM stdin;
    public          default    false    233   ��       �
          0    164043    verificationToken 
   TABLE DATA           I   COPY public."verificationToken" (identifier, token, expires) FROM stdin;
    public          default    false    234   ��       �	           2606    163885 -   account account_provider_providerAccountId_pk 
   CONSTRAINT     �   ALTER TABLE ONLY public.account
    ADD CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY (provider, "providerAccountId");
 Y   ALTER TABLE ONLY public.account DROP CONSTRAINT "account_provider_providerAccountId_pk";
       public            default    false    214    214            �	           2606    163895    address address_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.address DROP CONSTRAINT address_pkey;
       public            default    false    215            �	           2606    163901    attribute attribute_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.attribute
    ADD CONSTRAINT attribute_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.attribute DROP CONSTRAINT attribute_pkey;
       public            default    false    216            �	           2606    163907 $   attribute_value attribute_value_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.attribute_value
    ADD CONSTRAINT attribute_value_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.attribute_value DROP CONSTRAINT attribute_value_pkey;
       public            default    false    217            �	           2606    163915    cart_item cart_item_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.cart_item DROP CONSTRAINT cart_item_pkey;
       public            default    false    218            �	           2606    163923    cart cart_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            default    false    219            �	           2606    163933    category category_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public            default    false    220            �	           2606    163942    coupons coupons_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.coupons DROP CONSTRAINT coupons_pkey;
       public            default    false    221            
           2606    180233    notification notification_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.notification DROP CONSTRAINT notification_pkey;
       public            default    false    235            �	           2606    163950    order_item order_item_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.order_item DROP CONSTRAINT order_item_pkey;
       public            default    false    222            �	           2606    163961    order order_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."order" DROP CONSTRAINT order_pkey;
       public            default    false    223             
           2606    163974    product product_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            default    false    224            
           2606    163979 D   product_to_attribute product_to_attribute_product_id_attribute_id_pk 
   CONSTRAINT     �   ALTER TABLE ONLY public.product_to_attribute
    ADD CONSTRAINT product_to_attribute_product_id_attribute_id_pk PRIMARY KEY (product_id, attribute_id);
 n   ALTER TABLE ONLY public.product_to_attribute DROP CONSTRAINT product_to_attribute_product_id_attribute_id_pk;
       public            default    false    225    225            
           2606    163984 A   product_to_category product_to_category_product_id_category_id_pk 
   CONSTRAINT     �   ALTER TABLE ONLY public.product_to_category
    ADD CONSTRAINT product_to_category_product_id_category_id_pk PRIMARY KEY (product_id, category_id);
 k   ALTER TABLE ONLY public.product_to_category DROP CONSTRAINT product_to_category_product_id_category_id_pk;
       public            default    false    226    226            
           2606    163992    returnItem returnItem_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."returnItem"
    ADD CONSTRAINT "returnItem_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."returnItem" DROP CONSTRAINT "returnItem_pkey";
       public            default    false    227            	
           2606    164001    return return_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.return
    ADD CONSTRAINT return_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.return DROP CONSTRAINT return_pkey;
       public            default    false    228            
           2606    164011    review review_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.review DROP CONSTRAINT review_pkey;
       public            default    false    229            
           2606    164018    session session_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY ("sessionToken");
 >   ALTER TABLE ONLY public.session DROP CONSTRAINT session_pkey;
       public            default    false    230            
           2606    164028    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            default    false    231            
           2606    164036    variant variant_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.variant
    ADD CONSTRAINT variant_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.variant DROP CONSTRAINT variant_pkey;
       public            default    false    232            
           2606    164042     variant_value variant_value_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.variant_value
    ADD CONSTRAINT variant_value_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.variant_value DROP CONSTRAINT variant_value_pkey;
       public            default    false    233            
           2606    164049 7   verificationToken verificationToken_identifier_token_pk 
   CONSTRAINT     �   ALTER TABLE ONLY public."verificationToken"
    ADD CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY (identifier, token);
 e   ALTER TABLE ONLY public."verificationToken" DROP CONSTRAINT "verificationToken_identifier_token_pk";
       public            default    false    234    234            �	           1259    164175    cartItem_productId_cartId_key    INDEX     k   CREATE UNIQUE INDEX "cartItem_productId_cartId_key" ON public.cart_item USING btree (product_id, cart_id);
 3   DROP INDEX public."cartItem_productId_cartId_key";
       public            default    false    218    218            �	           1259    164176    cart_userId_key    INDEX     L   CREATE UNIQUE INDEX "cart_userId_key" ON public.cart USING btree (user_id);
 %   DROP INDEX public."cart_userId_key";
       public            default    false    219            �	           1259    212999    category_slug_key    INDEX     M   CREATE UNIQUE INDEX category_slug_key ON public.category USING btree (slug);
 %   DROP INDEX public.category_slug_key;
       public            default    false    220            �	           1259    164178    orderItem_productId_orderId_key    INDEX     o   CREATE UNIQUE INDEX "orderItem_productId_orderId_key" ON public.order_item USING btree (product_id, order_id);
 5   DROP INDEX public."orderItem_productId_orderId_key";
       public            default    false    222    222            
           1259    164179    product_slug_key    INDEX     K   CREATE UNIQUE INDEX product_slug_key ON public.product USING btree (slug);
 $   DROP INDEX public.product_slug_key;
       public            default    false    224            
           1259    164181    user_email_key    INDEX     I   CREATE UNIQUE INDEX user_email_key ON public."user" USING btree (email);
 "   DROP INDEX public.user_email_key;
       public            default    false    231            
           2606    164050 "   account account_user_id_user_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.account DROP CONSTRAINT account_user_id_user_id_fk;
       public          default    false    214    2576    231            
           2606    164055 "   address address_user_id_user_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.address DROP CONSTRAINT address_user_id_user_id_fk;
       public          default    false    215    2576    231            
           2606    164060 <   attribute_value attribute_value_attribute_id_attribute_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.attribute_value
    ADD CONSTRAINT attribute_value_attribute_id_attribute_id_fk FOREIGN KEY (attribute_id) REFERENCES public.attribute(id);
 f   ALTER TABLE ONLY public.attribute_value DROP CONSTRAINT attribute_value_attribute_id_attribute_id_fk;
       public          default    false    2540    217    216            
           2606    164075 &   cart_item cart_item_cart_id_cart_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_cart_id_cart_id_fk FOREIGN KEY (cart_id) REFERENCES public.cart(id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.cart_item DROP CONSTRAINT cart_item_cart_id_cart_id_fk;
       public          default    false    218    2547    219            
           2606    164065 ,   cart_item cart_item_product_id_product_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_product_id_product_id_fk FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.cart_item DROP CONSTRAINT cart_item_product_id_product_id_fk;
       public          default    false    218    224    2560            
           2606    164070 ,   cart_item cart_item_variant_id_variant_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_variant_id_variant_id_fk FOREIGN KEY (variant_id) REFERENCES public.variant(id) ON UPDATE CASCADE ON DELETE SET NULL;
 V   ALTER TABLE ONLY public.cart_item DROP CONSTRAINT cart_item_variant_id_variant_id_fk;
       public          default    false    232    2578    218            
           2606    164080    cart cart_user_id_user_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_user_id_user_id_fk;
       public          default    false    231    219    2576            2
           2606    180234 ,   notification notification_user_id_user_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.notification DROP CONSTRAINT notification_user_id_user_id_fk;
       public          default    false    231    235    2576             
           2606    164090 *   order_item order_item_order_id_order_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_order_id_order_id_fk FOREIGN KEY (order_id) REFERENCES public."order"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.order_item DROP CONSTRAINT order_item_order_id_order_id_fk;
       public          default    false    223    2558    222            !
           2606    164085 .   order_item order_item_product_id_product_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_product_id_product_id_fk FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.order_item DROP CONSTRAINT order_item_product_id_product_id_fk;
       public          default    false    2560    222    224            "
           2606    204805 .   order_item order_item_variant_id_variant_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_variant_id_variant_id_fk FOREIGN KEY (variant_id) REFERENCES public.variant(id) ON UPDATE CASCADE ON DELETE SET NULL;
 X   ALTER TABLE ONLY public.order_item DROP CONSTRAINT order_item_variant_id_variant_id_fk;
       public          default    false    232    222    2578            #
           2606    164095    order order_user_id_user_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 J   ALTER TABLE ONLY public."order" DROP CONSTRAINT order_user_id_user_id_fk;
       public          default    false    223    2576    231            $
           2606    164105 F   product_to_attribute product_to_attribute_attribute_id_attribute_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_to_attribute
    ADD CONSTRAINT product_to_attribute_attribute_id_attribute_id_fk FOREIGN KEY (attribute_id) REFERENCES public.attribute(id);
 p   ALTER TABLE ONLY public.product_to_attribute DROP CONSTRAINT product_to_attribute_attribute_id_attribute_id_fk;
       public          default    false    225    216    2540            %
           2606    164100 B   product_to_attribute product_to_attribute_product_id_product_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_to_attribute
    ADD CONSTRAINT product_to_attribute_product_id_product_id_fk FOREIGN KEY (product_id) REFERENCES public.product(id);
 l   ALTER TABLE ONLY public.product_to_attribute DROP CONSTRAINT product_to_attribute_product_id_product_id_fk;
       public          default    false    225    2560    224            &
           2606    164115 B   product_to_category product_to_category_category_id_category_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_to_category
    ADD CONSTRAINT product_to_category_category_id_category_id_fk FOREIGN KEY (category_id) REFERENCES public.category(id);
 l   ALTER TABLE ONLY public.product_to_category DROP CONSTRAINT product_to_category_category_id_category_id_fk;
       public          default    false    226    220    2550            '
           2606    164110 @   product_to_category product_to_category_product_id_product_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_to_category
    ADD CONSTRAINT product_to_category_product_id_product_id_fk FOREIGN KEY (product_id) REFERENCES public.product(id);
 j   ALTER TABLE ONLY public.product_to_category DROP CONSTRAINT product_to_category_product_id_product_id_fk;
       public          default    false    224    2560    226            (
           2606    204800 4   returnItem returnItem_order_item_id_order_item_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public."returnItem"
    ADD CONSTRAINT "returnItem_order_item_id_order_item_id_fk" FOREIGN KEY (order_item_id) REFERENCES public.order_item(id) ON UPDATE CASCADE ON DELETE SET NULL;
 b   ALTER TABLE ONLY public."returnItem" DROP CONSTRAINT "returnItem_order_item_id_order_item_id_fk";
       public          default    false    222    2556    227            )
           2606    164130 +   returnItem returnItem_returnId_return_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public."returnItem"
    ADD CONSTRAINT "returnItem_returnId_return_id_fk" FOREIGN KEY ("returnId") REFERENCES public.return(id) ON UPDATE CASCADE ON DELETE SET NULL;
 Y   ALTER TABLE ONLY public."returnItem" DROP CONSTRAINT "returnItem_returnId_return_id_fk";
       public          default    false    228    2569    227            *
           2606    164135 "   return return_order_id_order_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.return
    ADD CONSTRAINT return_order_id_order_id_fk FOREIGN KEY (order_id) REFERENCES public."order"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.return DROP CONSTRAINT return_order_id_order_id_fk;
       public          default    false    223    2558    228            +
           2606    164140     return return_user_id_user_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.return
    ADD CONSTRAINT return_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.return DROP CONSTRAINT return_user_id_user_id_fk;
       public          default    false    231    2576    228            ,
           2606    164145 &   review review_product_id_product_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_product_id_product_id_fk FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.review DROP CONSTRAINT review_product_id_product_id_fk;
       public          default    false    224    2560    229            -
           2606    164150     review review_user_id_user_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.review DROP CONSTRAINT review_user_id_user_id_fk;
       public          default    false    229    2576    231            .
           2606    164155 "   session session_user_id_user_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.session DROP CONSTRAINT session_user_id_user_id_fk;
       public          default    false    2576    230    231            /
           2606    164160 (   variant variant_product_id_product_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.variant
    ADD CONSTRAINT variant_product_id_product_id_fk FOREIGN KEY (product_id) REFERENCES public.product(id);
 R   ALTER TABLE ONLY public.variant DROP CONSTRAINT variant_product_id_product_id_fk;
       public          default    false    232    2560    224            0
           2606    164170 D   variant_value variant_value_attribute_value_id_attribute_value_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.variant_value
    ADD CONSTRAINT variant_value_attribute_value_id_attribute_value_id_fk FOREIGN KEY (attribute_value_id) REFERENCES public.attribute_value(id);
 n   ALTER TABLE ONLY public.variant_value DROP CONSTRAINT variant_value_attribute_value_id_attribute_value_id_fk;
       public          default    false    217    2542    233            1
           2606    164165 4   variant_value variant_value_variant_id_variant_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.variant_value
    ADD CONSTRAINT variant_value_variant_id_variant_id_fk FOREIGN KEY (variant_id) REFERENCES public.variant(id);
 ^   ALTER TABLE ONLY public.variant_value DROP CONSTRAINT variant_value_variant_id_variant_id_fk;
       public          default    false    232    2578    233            S           826    172033     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     {   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false    5            R           826    172032    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     x   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false    5            �
   R  x��Tɒ�6<{��ϰ��b0�c�����,F�������)�tP���_�J�MH�&m3��[�Iҭ$޸�$А��ϛ�'����M޶y�64��Pǳ"%дH�(r���fN�=��m�y� y'�b\Yg
S]Dg�!>$�*�-RO��r�>�Ŏ-�oc��#����R���G5�uN�#o��<��Z�)t&8^��c��C��Ѭzytс'�8�y�t�aCyy2t?'�NwD�nyp���&�<:���.�h�AP����x^N|���M؈�	EқuI"'�<��(y�Ǧ�������W0IW��i�?�q(>�=��־w��V��Wۡ��~��{'e�A�Y@=-O�y�.m�Foࡋ��`TfWw{9��d+�
T2KΝ�����#O�@�/���v%/ pJkoR(�_�G�vʛ��t)^P�\�.��b�*b$6�b��	���/|�EQ��E�ZR�,s��^�!��.Nq�A�,�&��☉C�$���@]�pGҙo #5P����Us�t��ke���Ik��5/��r�lp@��}NlO�N�O�5��j��z=$��ǡ�8z6DA�[�~�˫2�g�q��'�7��J���O��(�[�j�x�-[u=����F�i"��Z��8?\�:�������$�e�T�:\�H�T���/9�Tz �5K}��1f�g�Luګ��_�ְq�5��bԧs���.U�x@�}C�k�k1[Am��"Md�j��l�fn��J?<���g@��o*@���������u�ǐ����Y�bu�|i�V����G�FI�$Ш��E���){�N��a}������J�؞&��=x���5���ç\����~�J��g�o��8��[����7����ȹa���\s��� V���u������x4>���m�kǌ��NAZ<)�G�� R���u~����H}9
��g'w&I���Q�J��g5AS�=V�-�/댁��zJ!x��S��5�>[��I�G!��ƊP�Ҵ��C�HM.��	��K��I�L��-�Ti�1�o�p�m�ձg�}q*������\e�$ԭ`ή@-���]d���?�������?�\      �
      x������ � �      �
   W   x��1�  ����J��/.�Bbb$���{�)����ȉmHD��J�d$y{�o�:{m�R�(�M�Ь)M��Z����7; �R0
      �
   �   x����M@1��]%�Mv`��$�
�X��@o�2u��\x�Y�`�߇��~�HV�R`��6.yH㠣��ڒ#=A��)W%�8���g��uX(v�V��c��<����񽛇��$�j��.�܌���g��|_��L�� �8���gA���J�������g�����<S      �
   �   x�}��m1߫(6x���p��:���a��.���N2O;��
:�AlG8uF�gV~}~�YP�ԺiW�,,�PY'�-�sM��-ɠ�<Gr��a���j�x��Q�8F<���)0d1 o��Q�/;�]י.��T��!�7T�z�!�'�	J�(�����-:��ș���([���+A=m�F��F�������5P���w�N?��������~�J�=��y�R� ��q�      �
   �  x���ˍ�0E�v��I]D*���O�%�F��I�xs�܏*�!6�-�0/f_81�t�ڣ�Ȅ:��:U����F�6��GP�({��VA�6�e���c��#+���]�V���'"�2gH�C�Ae;��
�.���,q��� ��b�j(�򤚃1I�zp�ā+�ۘy�cAK�
��[bH����/w3�����'S[�b�i3c!4��kOZ[<�b�\�7ж;h�l�F��eʨ�@R�'��ܮ&^���Y�'��M��VI��Oy��N�Q[�|�?oA|�a��ͧ�.�ya����3f�7��*����(H�ȕ����.�Ko�l��Ї�̭���;�L��6�=���d[���m[Y��A�ݻl[P�6�f�@��)d�Č�@�/���v9���[���;��7r��i�(�sS���=Jf]��,�j��W��V�T�.-\π���Czv����E9.ʚr�]���_$7�S�d��"oI��L�j���������	Gy��      �
      x������ � �      �
      x������ � �      �
      x������ � �      �
     x����n�0��ux����;ΎN m����*!۱i�$4(��ݧh�f�����:���X-�)�Q(�)@�c,S��A�wz���z�2�� �D��"��})B5�a ��.�����xO#��ͥ~��ɿ˶[��f�e��8�Je*���rcN~\]���V�rS�N�.oZ���6[��l��n�{��j\�;gvP�������r�Ff����ߌ�-�ٹ�B�v;��'G�N��4�wf���j�w�a>;�3?��0�M�{�'U����S 9���0�a��B�;�+��hj!V� @I�aB޿�	RC-��P����:s�0I\9=O�����qzߜ�Vv�����$;�8�]������u��v�IO��֯�����ٗ��F�D�7p�fWRH����Z�
a��Z.,'�}�"D��W���������_ ��i����h���>�W�{���&i��<[+��F�#��嘆������D�G5D@9WR��Q�����33      �
   �   x����u1���*� ��b�p��E�k�9��)�>f,��L�L���W.֢N\:��HA�MA��� VFd'E�kZ9��+���xL��K�`dt@�"�X.�	�O!���>Ѩ���7�
%��3Wβȹq}ho)V=@'u�#�k��E�2�7��M���6v�%;1������b�����n��� �4�_��2�Z�(6�^�����iQ�_\��/�W�z�O��~�}����&�ym      �
      x��[�r�H�}FE�t�ͤ�/�'J��jm%JV��"	 A����|L�t��|㜛	P���e���I�~�so^XV���es�	w��屌$�ib��cZN*��E�JvR)�.D+�Q�e"���55�9�J5���xX���vXK5�^�i^�ٴ���\ʲe���[�ג�bY�4u���n�gV��T�cv�gm�ڊ5�*/ئ�jVT����"�
c��Ӥ�a���e�(�Fԛ{'
�������x<6�(2~�4��0������lv:=2�sѶ�fo/�i��X��Z����^`���߹��������ݹ�~<���·�����h>۴]nܴ���;Ѿ���4��kM��埢�|��۾����#�<p3qD`��4}{���:xî��q!��S+�R�T�);�A����9c���N���\�#���e?�/0��4��9�b0����~X-W����ܰcѴ,�`m-�&���rU��ٵ�������|�`�b%�~;ϫ,��C�Z�������L�u�,s��������Ffz ��RlX,Y-� Ʃ��jW��O�iZ�l�\��>B4Y*W�T�Q��kd���F�_HwR�Y>�h.4U��ـ�)_&Ǿuvp���ّ����0��.�QӶ�֤��w��wc��0�_'�B�!OLH�/�8�lc&ʣ�y`���>��1�|V��KO9�Mn'�����$�k�4� �xӐa�nA��~�z����|7�T4֭�H��� A`Q\U-��X��Z��1�Zy�i]T"U�%�N	��fҀ`"���������*��������t0��߳Ѡ#�Zuq�7�hV2ɳ~�FM?�Z&���H�ZHE���ׇx
�,[�R�$��-;�*�w5�n]��Y=i�b�f�[�������
����~�36�v�Gʤe�(�~V��d=�\�*r#E���đ$&��n���x{͞����lɰ=)[���E���@wML���b�����fjk;|��(FZ���zw�ZՏ��z����z��5i�KB���p�㦙�C7u���v৶��1I ���6dq�lk�h�B6�+�4��+�M�	v04߲���+`l��"/�1��M�)~�q�m��z�a�H9M�?q��竆w4���X����k�R��R�jm�;��<e7P/�+C#�m�\NeUT�͘]VZs�WYd0�$�靈	��:��(���r���g�J�N�.��Z���+��b)!dM>/�ߘ"'ᇻl�LB�����6W������L9�n��,ÿ�ʬ[�Pj��-� [�P{3f5�b[	��홬����E)�>p����h��c�N�:�\�<�1�k:��� �vz'�V)�?��08����E����4(�~\=�%���ߠA��o�c3�"��Z�� 74�ГwM���X<�m	�|gB:Iϵl:͍�D���D&&t��î~�OĒQ��`ʛ�C7�^G�?�<y�~{G��"*�"Yd3-�?�O��a�ptj�F$�<Y�#�c��g��E�\-z^$nD��e�鳀����\K;���PÍ����)��]Oo��������h�{?b�w7ﰋ�����	���<����ƴ�v�(�b��4��x�?��\��]����WY��!��e����˫��#(�k�(˝����y�C)�dX�v �h:�k$��'	�.�G=5���?�ӳ�Sv3=����9���NtWQ]a�/Ԙ"���G�/+��������Qыv�i�����e��SȢ��k�ϭk�����5��#�����k��������c��vm ��r� 5.$pȡh��3�����>��Ǽ�c��1M���_�J�x�b�X�kPx{u�[0�{��K@VV u�Y��WY�)/ Zހ�B�
���
"�,R��� Ȗ&>�ЂġY��%�RIߋj=��� ��]�+J&�V�}yP��gy�5E��q0�:���1�ٷ�}7��;D�1k�<�S�]'x�"�MdfF~�24��E���� ����جa�b.tz�;6���f����J�N��e[�3>b6�n��R�U��x��t:�7j.��4o�\0�����\�u�d�iv�Z���=��֢ۚ����cjXn����E z-��%3ЯJ^e)��+)�b���A�Pa�rMq��,&� )SXeW���2�H�BۮUC���(��=�=���nu�y��p�~y.���I�8�6��p�
Ƕ; ��]3��ف�����8��IMKf��@R�E�ٻl�.���n4-�{a�W�,�eSj�E@ڻf�A!��p��Rq�d��j�Ř~ZT��z�2=%��`Gr�XB[�6k�(:1BC`��4�E�4+�|@�:ς�"}��*����7$x��:��]-k�$�@���a�ư�>��/���-���M��^h?Y0��ݷ�}��� >���񸗆w��0	`��:vj�Y׹���j]���y�����˂����@�G�ti��J��պ�5F=��6�(|�(��Q�0���*Yp�%��nΦ )	�A		�͎�����+�b����uw4�|�û��A����?㤻wdcg�QM�(-���n��<��±m۱ߠ�t��C��w�ȓ�Z	Jh�FC�=�T3_�AA�7$�d'N:A-e:F@y/�|�O�1�,��S�mRx0�d)��H���)���s*2)Y��U!w�k�qW������nX��VJ�Ro����N����	����Tp���h�[mϜ�J ��� ��,�8���f���EQ��x����kD��.�1�����=��6:��U[�hC��y��e�-���6��x�zOFyH�Q�w%����T���Z��1��M;&�5���DM���ę5�Eު!���U��s�(�SԘae3T8�;/k�뿦ܞ����� �uQ�׳��k�5ii��,�,偔 ��ra�>d���vl����準˼[n�v�g���  ZۍtV��6��m�����Otv�� �6��+e����c�@D��m��	C�0� e;b*�ak�>���g-�߫,׈�I�b��[(����e6 �5�0V)7my����`k�)(QW������\O���7�Rٜ�a8�jք��{A��VR��\��y�`-�>�G	�F��>���ΒE^R\��
�sZ�Dpڢ�0X�9�xryt�s3z����{|��ql/��֤��rD�ّǳT¸����B���ȑ�L�^�+u����]���5��Z�V?n�gt�<ߛtm�,��U:8��5ש�R9�\��	jL1�d��X���,B��X�ԗ%�o�f��
��@Mb�a����%�]����5]ꨬ�IU�l�C��E�'z�sLPԵ̋[�eL����K�P�Zq�t���X���ЩR�ќB:Q>4������Λv)����y}�/�Ê�wۢĻ?��p`*�/3�Ϛz�gQ
_�x�����q�/ t2ML3ˌ�������lz��8��fe��+�Z-�Lsb*Z8Vψ���������x3��(��KD����?�b��͠� :-F	�ѐ�G	(�$H���)�$�B�\��2�?#D,6�.�^e��ّlE�m�9�U"����I��a�)I���+���j�>�A�1E|i�p휬9�t��<�mZ�'�����<H�R��$:W7)�Dy�~�W T�R)*�3���)��7�v�gLeypR�F�U��J�L@��t�An��*��Ns�����JJ�w-u��݇cԤj�t�&�T�촃1[)��&�Ǯi�nm���d��N���2�6�#�	A�Y��"c!��G��1s�����zC�ZW��{c�>\'>$p�\	��nU�S�}ޒ�*�e��:J��9�j.5��Z��g��))�@Z�R��,4�E
�GG|�F�����Mr_�{�{��y��&���L���֤m�"�s�S�K�k����x�h��*�	c㜼 ��R	!m�n�z�r"q,�O�\�:��@���_{�i�F��8&�d�U �
  �����g��z��<<�y�����������tr9}Ӏ��[�m��n�7o�� �oY��<e6~^��^]�7����ގ���%�/_geĔHi����j���euE]6?�j~UnI���ó���t��ή�YxIL��h��n'[u�Ӄ�����]]����W����O'���}~v9eG7;Mg7W��ԱK��+��NM	�˾!�e�q���+��I����8�-���k�1��pi�a��oC�o(s>�T�IU�Dx��w���
�>�Q���sZ�QS�|�4�|�0�7z,��c����
:5^��	��A✟?!}RQ�k�5�i-ִzj��U!#<�D��r2Zda����1����(�(���?����l�l��A��9`^�\)x���%1�]�Ȇ'U<*���W��FT�h
����:���9*ٔ���Ai���IK���� �S��uv��і*��r�X^�+T���i�����W���`�����>�*���"��-�+-C0�&���2��<�Ҍ'���Il���?l��Og2R3-,ıK�J�1�
�e�q��:O�Po�E����J�ȍ��f�v_f�0<ӟF:�
���MHLϖ��cĎ* �`��8[l#m�/�#����"*�ֶ{�n�8�%X��bm��!��d|�֛Č�����~�/��?;�������gڶ��0�o��$JB��˽ ����	=�fb	@�x�ժOr�+!l̀aEF�^[�����3TO�""I��?T��=+VC7]�F �i�=%徣t�Sw���	v�J�@>�����X]UK����!�Đ�������A�9��f�E�۾b-��(�+��;���)���B�n��K2ܴ�ѽ��B��è�0�K<����m+{��*K�V0�l�0W�=��_��s��	����v�ihZ�a��4u1�m���D2���8�\���{�E�a�L%-��f��\��RQ>V��rbL���f�%RNH�y��-��4��s���g*�!���=�v�}�i�[I8�<f/y�*�褦�]A?�r0����3L�Z{WY�'r���ތ��b�c� ����������h֑��t*k��cò��^\\�:�Lp//�Y�B3���/�뛴4�aj���f��qqa%>�R/u_��,/r���1kP����U���K��c��C(�Ye�*4~*��ǞaYF���+��c�y�j����R	 ܦH ������b��Rp�3�=d/����W�Y���/����c}�~P6��&Uq!K'��U�ʻ�������q�{���:�-�G���p�v[�J��^q�-�V4TkЅ V-�L6P3,��t���r��c4еê7H���P�
�ssvAfK���:���B���[���ّ���C�fZ�*	*�����Z{�3.:M�*aVm�TY�/k�e��t�)>��US�/��������$���ȷ��K����/�KS+0͐;���G� t���La�QhEL0َ�:��M��N�b�&��?; ���L�楨7��*�����a���nE%�{�V����釻��j�}�d��c����1��m�V�������v��2
�̏�cߌ�+��dfvfP�?�DF�q0����Ӳl��z`��|�5����o���-��z��NHu�J�ڇ6}�o��(9��}�ܷ�q�[���sM�0�=��6���U���&\Nf���fGG�,��c�7�^��J`S%Π)4��Iナ�?}���:VwFT���({9�au��TI�����yUVK8Z����@�a��(ok 4|1m��oO�f� �p�E����rE/��jg���ݾ�^x�.��o��m2l�ﯪ��[-���]�P���._b�<�����]������vv@%��ӛ㫛��������c�SNfS5��A��D��'��U�*�_��r�f!�P;��6��C���Pb73L{1���/m��Sc�ڱ19�����-���|u�f���k6=:Q����--/z�Xr����I2��f�Ժ�1.h�:�~!o�^<P.IeEt�$���; ���� HY�B�7pl��(��Ы�����ҫU��~]n=Ǿ���=��s��������١J�oy�	�bM�-:ZVu�T����S��r^�K�۱*�@�n�2��=�V����<}���T��\)�]��N����됦+�,NE��ҽ��2�/�ْB��?�����L�ٝe�P`�C��f�̊؜�J���<�rv���mO둦�.M��%	ԝ����������v���A�?P�!��</�ꟿg7�ë�����ypv|�O��}�6wTyG-��(J�כSzi.��uI@ORM� ����f����ӯ]��}�t�W�T��$?뜨%��������J�ޞmT�D�.l�C�x�.�o��)Q��dXow��Gۻ�Q���ߛ����ҍ������)=B�3E��xԵ^�v���nH�E��V��N_w�ڈ[�ϴ"@���P��R�("iY���ZjR��~C�SE��*xU�+�e�e��pWW]���XW���!�ڎ�;��j�=�����E��O�.+3J~)�־e�{��^����������?�/d��j      �
   b   x�����0�w��y���K>`��KpJH��\iV�� ��DZ�*��)^��-�Q�hZ��;V�y4�G�?�*�Nlv/�@�������{��^@r%      �
      x������ � �      �
      x������ � �      �
      x������ � �      �
      x������ � �      �
   �   x��ͻ!��T�ލ�A-N�����l�g�ᴎR�	�47��"��q׫?^,��M�Pޅ�bzO�O�~1��}��/���r�6�r;�<z�����Y��S�{�9ěi�/�k���6� �Z^�I
��و��/�%z�{�\��/@G,      �
   �   x�5�Ɋ�0  �s��@�4I��8���A�L��Y�Dѿ�<>xq�
LZ�i �\@���4nY�'�_�b���fRz�J:�h���|P��W����(R=	;k;%oN^�5^?��G�˭X�φ��C�̯p����q�~����0��Y����8�c�-�3tx�~8�B0��b4A��YA��"� ^��B(      �
      x������ � �      �
      x������ � �      �
      x������ � �     