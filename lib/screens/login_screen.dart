import 'package:asdocs/colors.dart';
import 'package:asdocs/repository/auth_repository.dart';
import 'package:asdocs/screens/home_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:routemaster/routemaster.dart';

class LoginScreen extends ConsumerWidget {
  const LoginScreen({super.key});
  /*
  ProviderRef ref = allows to establish communication between providers
  WidgetRef ref = allows to communicate providers to widgets 
  */

  void signInWithGoogle(WidgetRef ref, BuildContext context) async {
    //  function to call googleSignIn Method from AuthRepository
    final errorModel = await ref
        .read(authRepositoryProvider)
        .signInWithGoogle(); // Instead of creating instance of class. It will help in large scale apps

    if (errorModel.error == null) {
      ref.read(userProvider.notifier).update(
            (state) => errorModel.data,
          );

      Future.delayed(const Duration(microseconds: 100)).then(
        (value) => Routemaster.of(context).push('/'),
      );
    } else {
      Future.delayed(const Duration(microseconds: 100)).then(
        (value) => ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(errorModel.error!),
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // always try to use watch in build method
    return Scaffold(
      body: Center(
        child: ElevatedButton.icon(
          onPressed: () => signInWithGoogle(ref, context),
          icon: Image.asset(
            'assets/images/g-logo.png',
            height: 30,
          ),
          label: const Text(
            'Sign in with Google',
            style: TextStyle(
              color: kBlackColor,
            ),
          ),
          style: ElevatedButton.styleFrom(
            backgroundColor: kWhiteColor,
            minimumSize: const Size(150, 50),
          ),
        ),
      ),
    );
  }
}
