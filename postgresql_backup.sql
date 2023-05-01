PGDMP     "                    {            flower_project    15.1    15.1     !           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            "           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            #           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            $           1262    16400    flower_project    DATABASE     �   CREATE DATABASE flower_project WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE flower_project;
                postgres    false            �            1259    16430    orders    TABLE       CREATE TABLE public.orders (
    id integer NOT NULL,
    date_and_time timestamp with time zone DEFAULT LOCALTIMESTAMP NOT NULL,
    client_id integer NOT NULL,
    shopping_cart text NOT NULL,
    price numeric(15,2) NOT NULL,
    status text NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16429    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
    CYCLE;
 $   DROP SEQUENCE public.orders_id_seq;
       public          postgres    false    215            %           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public          postgres    false    214            �            1259    16479 
   categories    TABLE     �   CREATE TABLE public.categories (
    id integer DEFAULT nextval('public.orders_id_seq'::regclass) NOT NULL,
    name text NOT NULL
);
    DROP TABLE public.categories;
       public         heap    postgres    false    214            �            1259    16488    items    TABLE     �  CREATE TABLE public.items (
    id integer DEFAULT nextval('public.orders_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    category_id integer NOT NULL,
    price numeric(15,2) NOT NULL,
    count integer NOT NULL,
    description text,
    image text,
    CONSTRAINT "item counts must be non-negative" CHECK ((count >= 0)),
    CONSTRAINT "item prices must be non-negative" CHECK ((price >= (0)::numeric))
);
    DROP TABLE public.items;
       public         heap    postgres    false    214            �            1259    16498    users    TABLE     &  CREATE TABLE public.users (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text,
    email text NOT NULL,
    phone_number text NOT NULL,
    password text NOT NULL,
    role text NOT NULL,
    shopping_cart_id integer DEFAULT nextval('public.orders_id_seq'::regclass)
);
    DROP TABLE public.users;
       public         heap    postgres    false    214            �            1259    24709    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
    CYCLE;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    218            &           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    219            r           2604    24707 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            v           2604    24711    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218                      0    16479 
   categories 
   TABLE DATA           .   COPY public.categories (id, name) FROM stdin;
    public          postgres    false    216   �#                 0    16488    items 
   TABLE DATA           X   COPY public.items (id, name, category_id, price, count, description, image) FROM stdin;
    public          postgres    false    217   �#                 0    16430    orders 
   TABLE DATA           \   COPY public.orders (id, date_and_time, client_id, shopping_cart, price, status) FROM stdin;
    public          postgres    false    215   �#                 0    16498    users 
   TABLE DATA           q   COPY public.users (id, first_name, last_name, email, phone_number, password, role, shopping_cart_id) FROM stdin;
    public          postgres    false    218   d$       '           0    0    orders_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.orders_id_seq', 5, true);
          public          postgres    false    214            (           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 3, true);
          public          postgres    false    219            ~           2606    16486 &   categories category ids must be unique 
   CONSTRAINT     f   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "category ids must be unique" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.categories DROP CONSTRAINT "category ids must be unique";
       public            postgres    false    216            �           2606    16511 $   users email addresses must be unique 
   CONSTRAINT     b   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "email addresses must be unique" UNIQUE (email);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "email addresses must be unique";
       public            postgres    false    218            �           2606    16497    items item ids must be unique 
   CONSTRAINT     ]   ALTER TABLE ONLY public.items
    ADD CONSTRAINT "item ids must be unique" PRIMARY KEY (id);
 I   ALTER TABLE ONLY public.items DROP CONSTRAINT "item ids must be unique";
       public            postgres    false    217            |           2606    16463    orders order ids must be unique 
   CONSTRAINT     _   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "order ids must be unique" PRIMARY KEY (id);
 K   ALTER TABLE ONLY public.orders DROP CONSTRAINT "order ids must be unique";
       public            postgres    false    215            x           2606    16514 (   orders order prices must be non-negative    CHECK CONSTRAINT     |   ALTER TABLE public.orders
    ADD CONSTRAINT "order prices must be non-negative" CHECK ((price >= (0)::numeric)) NOT VALID;
 O   ALTER TABLE public.orders DROP CONSTRAINT "order prices must be non-negative";
       public          postgres    false    215    215            �           2606    16513 "   users phone numbers must be unique 
   CONSTRAINT     g   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "phone numbers must be unique" UNIQUE (phone_number);
 N   ALTER TABLE ONLY public.users DROP CONSTRAINT "phone numbers must be unique";
       public            postgres    false    218            �           2606    16526 &   users shopping cart ids must be unique 
   CONSTRAINT     o   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "shopping cart ids must be unique" UNIQUE (shopping_cart_id);
 R   ALTER TABLE ONLY public.users DROP CONSTRAINT "shopping cart ids must be unique";
       public            postgres    false    218            �           2606    16505    users user ids must be unique 
   CONSTRAINT     ]   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "user ids must be unique" PRIMARY KEY (id);
 I   ALTER TABLE ONLY public.users DROP CONSTRAINT "user ids must be unique";
       public            postgres    false    218            �           2606    16520 
   items none    FK CONSTRAINT     �   ALTER TABLE ONLY public.items
    ADD CONSTRAINT "none" FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 6   ALTER TABLE ONLY public.items DROP CONSTRAINT "none";
       public          postgres    false    217    216    3198            �           2606    16527    orders none    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "none" FOREIGN KEY (client_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;
 7   ALTER TABLE ONLY public.orders DROP CONSTRAINT "none";
       public          postgres    false    215    3208    218                  x������ � �            x������ � �         Y   x�]�;@0 �z��M2��LH�Z�
&�w���O��œy��c6͜�J�!��
D0,�q�����T���$1I�}g-��1 ���         >   x�3�,.)��K�Q�ũE���9�z����چF�&�f���0E�9��y%�&\1z\\\ �^     