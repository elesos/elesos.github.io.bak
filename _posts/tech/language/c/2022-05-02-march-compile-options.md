---
layout: post
title: March 选项 跨平台编译选项
date: 2022-05-02 05:30:00 +0800
categories: [C]
tags: [C]
---
常用的 march 选项

armv7-a，armv5te（用于armv5），atom（用于x86）
https://gcc.gnu.org/onlinedocs/gcc/ARM-Options.html

http://infocenter.arm.com/help/topic/com.arm.doc.dui0773c/DUI0773C_software_development_guide.pdf


常用的跨平台编译选项：
```
  --host=HOST              该软件将运行的平台,在交叉编译过程中这个需要我们来指定 build programs to run on HOST,常用值arm-linux用于armv7a，aarch64-linux用到arm64, i686-linux用于x86, i386-apple-darwin用于模拟器i386，aarch64-apple-darwin用于arm64，arm-apple-darwin用于非arm64的   。host !=build的时候编译才是交叉编译


  --cross-prefix=PREFIX    use PREFIX for compilation tools


  --sysroot=SYSROOT        root of cross-build tree


Toolchain options:


  --arch=ARCH              select architecture  # 常用值：arm用于armv7a，aarch64用于arm64，x86用于x86，x86_64用于x86_64， 还有ios中的armv7，armv7s，arm64，i386，x86_64


  --cpu=CPU                select the minimum required CPU (affects instruction selection, may crash on older CPUs)，常用值：i686(用于x86)，cortex-a8用于armv7a


  --enable-cross-compile   assume a cross-compiler is used


  --sysinclude=PATH        location of cross-build system headers


  --target-os=OS           compiler targets OS     如darwin， 编译安卓版时可以指定为linux或android


  --target  :该软件所处理的目标平台,很少用，好像是制作交叉工具时才用到


  --target-exec=CMD        command to run executables on target


  --target-path=DIR        path to view of build directory on target


  --target-samples=DIR     path to samples directory on target


  --tempprefix=PATH        force fixed dir/prefix instead of mktemp for checks


  --toolchain=NAME         set tool defaults according to NAME
                           (gcc-asan, clang-asan, gcc-msan, clang-msan,
                           gcc-tsan, clang-tsan, gcc-usan, clang-usan,
                           valgrind-massif, valgrind-memcheck,
                           msvc, icl, gcov, llvm-cov, hardened)


  --nm=NM                  use nm tool NM [nm -g]


  --ar=AR                  use archive tool AR [ar]


  --as=AS                  use assembler AS []


  --ln_s=LN_S              use symbolic link tool LN_S [ln -s -f]


  --strip=STRIP            use strip tool STRIP [strip]


  --windres=WINDRES        use windows resource compiler WINDRES [windres]


  --x86asmexe=EXE          use nasm-compatible assembler EXE [nasm]


  --cc=CC                  use C compiler CC [gcc]


  --cxx=CXX                use C compiler CXX [g++]


  --objcc=OCC              use ObjC compiler OCC [gcc]


  --dep-cc=DEPCC           use dependency generator DEPCC [gcc]


  --nvcc=NVCC              use Nvidia CUDA compiler NVCC [nvcc]


  --ld=LD                  use linker LD []


  --pkg-config=PKGCONFIG   use pkg-config tool PKGCONFIG [pkg-config]


  --pkg-config-flags=FLAGS pass additional flags to pkgconf []


  --ranlib=RANLIB          use ranlib RANLIB [ranlib]


  --doxygen=DOXYGEN        use DOXYGEN to generate API doc [doxygen]


  --host-cc=HOSTCC         use host C compiler HOSTCC


  --host-cflags=HCFLAGS    use HCFLAGS when compiling for host


  --host-cppflags=HCPPFLAGS use HCPPFLAGS when compiling for host


  --host-ld=HOSTLD         use host linker HOSTLD


  --host-ldflags=HLDFLAGS  use HLDFLAGS when linking for host


  --host-libs=HLIBS        use libs HLIBS when linking for host


  --host-os=OS             compiler host OS []


  --extra-cflags=ECFLAGS   add ECFLAGS to CFLAGS []


  --extra-cxxflags=ECFLAGS add ECFLAGS to CXXFLAGS []


  --extra-objcflags=FLAGS  add FLAGS to OBJCFLAGS []


  --extra-ldflags=ELDFLAGS add ELDFLAGS to LDFLAGS []


  --extra-ldexeflags=ELDFLAGS add ELDFLAGS to LDEXEFLAGS []


  --extra-ldsoflags=ELDFLAGS add ELDFLAGS to LDSOFLAGS []


  --extra-libs=ELIBS       add ELIBS []


  --extra-version=STRING   version string suffix []


  --optflags=OPTFLAGS      override optimization-related compiler flags


  --nvccflags=NVCCFLAGS    override nvcc flags [-gencode arch=compute_30,code=sm_30 -O2]


  --build=BUILD     configure for building on BUILD [guessed]   编译该软件所使用的平台


  --build-suffix=SUFFIX    library name suffix []


  --enable-pic             build position-independent code


  --enable-thumb           compile for Thumb instruction set


  --enable-lto             use link-time optimization


  --env="ENV=override"     override the environment variables
```